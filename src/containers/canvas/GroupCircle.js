import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import Circle from '../../classes/circle'
import { optionStore } from '../../classes/circle'
import DisplayComponent from '../../components/canvas/GroupCircle'

import * as WindowAction from '../../modules/window'


const display = "GroupCircle"

const initialProps = {
    canvas: null,
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    isCircleClicked: false
}

const canRenderProps = [
    'canvas',
    'windowHeight',
    'windowWidth',
]

// propsの値を変更する
const handleChange = (ownProps) => (name, value) => {
    return {
        [name]: value
    }
}

const onResize = (ownProps) => (h, w) => {
    return {
        windowHeight: h,
        windowWidth: w,
    }
}
// propsの変更を行うhandler
const stateHandler = {
    handleChange,
    onResize
}

const setCircle = (ownProps) => (canvas) => {
    const {
        windowHeight,
        windowWidth
    } = ownProps
    const height = windowHeight * 2
    const width = windowWidth * 2

    canvas.height = height
    canvas.width = width
    // canvas.style.height = height
    // canvas.style.width = width
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    // スマートフォン用の設定
    const circleOptions = [
        {
            name: 'Blogs',
            x: width * 0.34,
            y: height * 0.6,
            size: width * 0.25,
            color: '#fff',
            text: '学びの記録'
        },
        {
            name: 'Works',
            x: width * 0.66,
            y: height * 0.51,
            size: width * 0.25,
            color: '#fff',
            text: '作品一覧'
        },
    ]

    const ua = navigator.userAgent.toLowerCase()
    for (let i = 0; i < circleOptions.length; i++) {

        const circleOption = circleOptions[i]
        const {
            name,
            x,
            y,
            size,
            color,
            text
        } = circleOption

        let responsiveX = x
        let responsiveY = y
        let responsiveSize = size
        if (ua.match(/android|iphone/) === null) {
            responsiveX *= name === 'Blogs' ? 1.25 : 0.89
            responsiveY *= name === 'Blogs' ? 1.1 : 1.08
            responsiveSize *= width > 1000 ? 0.5 : 0.65
        }
        if (ua.match(/ipad/) !== null) {
            responsiveX *= name === 'Blogs' ? 0.8 : 1.1
            responsiveY *= name === 'Blogs' ? 1 : 1.1
            responsiveSize = width * 0.25
        }

        const circle = new Circle(ctx, name, responsiveX, responsiveY, responsiveSize, color, text)
        circle.setShadow()
        circle.drawCircle()
        circle.resetShadow()
        circle.setTitle()
        circle.setText()
    }
}


const setClickEvent = (ownProps) => {
    // クリックされているかどうかを確認する変数
    let isClicked = false
    return {
        onCircleClick: (ownProps) => (props) => (e) => {
            const {
                canvas,
                handleChange,
                isCircleClicked
            } = ownProps

            // circleがクリックされているなら処理をしない
            if (isClicked) {
                return
            }

            // クリックを禁止する
            isClicked = true

            const ctx = canvas.getContext('2d')
            let activeCircle = null
            for (let i = 0; i < optionStore.length; i++) {
                const {
                    name,
                    x,
                    y,
                    size,
                    color,
                    text
                } = optionStore[i]
                const circle = new Circle(ctx, name, x, y, size, color, text)
                const isAnimation = circle.onClick(e, props)
                if (isAnimation) {
                    // 配列の中で最後の要素かつ円の範囲をクリックされているものを代入
                    activeCircle = circle
                }
            }
            // 手前の円のみにアニメーションを付ける
            if (activeCircle !== null) {
                window.requestAnimationFrame(
                    activeCircle.clickAnimation(
                        activeCircle.transitionAnimation(props),
                        activeCircle.size,
                        props
                    )
                )
            }
        }
    }
}

const setRef = () => {
    let refs = {}
    return {
        setRef: ownProps => (event, name) => (refs[name] = event),
        getRefs: ownProps => () => refs
    }
}
// propsの変更を行わないhandler
const handleProps = (ownProps) => ({
    ...setRef(),
    ...setClickEvent(ownProps),
    setCircle,
})

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

// componentDidMountなどのライフサイクルを記述する
const lifeCycle = {
    componentDidMount() {
        const {
            setCircle,
            getRefs
        } = this.props

        const refs = getRefs()
        const {
            canvas
        } = refs
        setCircle(canvas)
        this.props.handleChange('canvas', canvas)
    },
    componentDidUpdate() {
        const {
            onResize,
            canvas,
            setCircle
        } = this.props
        if (canvas !== null) {
            let queue = null
            window.addEventListener('resize', () => {
                clearTimeout(queue)
                queue = setTimeout(() => {
                    onResize(window.innerHeight, window.innerWidth)
                    setCircle(canvas)
                }, 100)
            })
        }
    }
}

const Enhance = compose(
    setDisplayName(display),
    withStateHandlers(
        initialProps,
        stateHandler
    ),
    withHandlers(handleProps),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle(lifeCycle),
    onlyUpdateForKeys(canRenderProps),
)

export default Enhance(DisplayComponent)