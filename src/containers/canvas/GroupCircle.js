import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import Circle from '../../classes/circle'
import { optionStore } from '../../classes/circle'
import GroupCircle from '../../components/canvas/GroupCircle'

import * as WindowAction from '../../modules/window'


const display = "GroupCircle"
const component = GroupCircle

const initialProps = {
    canvas: null,
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
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
    console.log(h, w)

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
    const height = windowHeight
    const width = windowWidth

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height);
    const circleOptions = [
        {
            name: 'Blogs',
            x: width * 0.35,
            y: height * 0.6,
            size: width * 0.25,
            color: '#fff'
        },
        {
            name: 'Works',
            x: width * 0.65,
            y: height * 0.45,
            size: width * 0.25,
            color: '#fff'
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
            color
        } = circleOption

        let responsiveX = x
        let responsiveY = y
        let responsiveSize = size
        if (ua.match(/android|iphone/) === null) {
            responsiveX *= name === 'Blogs' ? 1.2 : 0.92
            responsiveY *= name === 'Blogs' ? 0.95 : 0.9
            responsiveSize *= width > 1000 ? 0.5 : 0.7
        }
        if (ua.match(/ipad/) !== null) {
            responsiveX *= name === 'Blogs' ? 0.8 : 1.1
            responsiveY *= name === 'Blogs' ? 1 : 1.1
            responsiveSize = width * 0.25
        }

        const circle = new Circle(ctx, name, responsiveX, responsiveY, responsiveSize, color)
        circle.drawCircle()
        circle.setShadow()
        circle.setText()
    }
}


const onCircleClick = (ownProps) => (props) => (e) => {
    const ctx = ownProps.canvas.getContext('2d')
    for (let i = 0; i < optionStore.length; i++) {
        const {
            name,
            x,
            y,
            size,
            color
        } = optionStore[i]
        const circle = new Circle(ctx, name, x, y, size, color)
        circle.onClick(e, props)
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
const handleProps = {
    ...setRef(),
    setCircle,
    onCircleClick
}

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

export default Enhance(component)