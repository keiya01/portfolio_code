import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import { setWindowHeight } from '../../util/responsive'

import DisplayComponent from '../../components/blogs/BlogTopScreen'

const display = 'BlogTopScreen'

const initialProps = {
    isHeaderHide: true
}

const canRenderProps = [
    'isHeaderHide'
]

// propsの値を変更する
const handleChange = (ownProps) => {
    return (name, value) => {
        return {
            [name]: value
        }
    }
}


// propsの変更を行うhandler
const stateHandler = {
    handleChange,
}

const containerRefHandle = () => {
    let refs = {}
    return {
        setContainer: (ownProps) => name => e => (refs[name] = e),
        getContainer: (ownProps) => () => refs
    }
}

const refHandler = () => {
    let refs = {}
    return {
        setRef: (ownProps) => name => e => (refs[name] = e),
        getRefs: (ownProps) => (name) => refs[name]
    }
}

const scrollContainer = (ownProps) => (props) => {
    const {
        getContainer,
    } = props

    const windowHeight = setWindowHeight()

    const containers = getContainer()
    const totalContainers = Object.keys(containers).length
    const documentElem = window.document.scrollingElement || window.document.documentElement
    let scrollPosition = documentElem.scrollTop
    const slideCount = Math.floor(scrollPosition / (windowHeight))
    const container = containers[slideCount + 1]
    // containerが存在しないか、最後の要素なら処理を終了する
    if (!container || totalContainers === slideCount + 1) {
        return
    }

    const rect = container.getBoundingClientRect()
    // scrollPositionが1倍以上なら画面の大きさに対して倍率が0になるように調整する
    if (slideCount !== 0) {
        scrollPosition -= (windowHeight * slideCount)
    }

    if (slideCount !== 0 && rect.top > -10) {
        const prevContainer = containers[slideCount]
        window.scrollTo(0, window.pageYOffset)
        prevContainer.style.top = `-${windowHeight - 10}px`
        prevContainer.style.bottom = `${windowHeight - 10}px`
        container.style.top = `0px`
        container.style.bottom = `0px`
    }

    container.style.top = `-${scrollPosition}px`
    container.style.bottom = `${scrollPosition}px`

}

const showSlideAnimation = (containers, moveDistance, nextContainerId) => (timestamp) => {
    const windowHeight = setWindowHeight()
    const time = 70
    moveDistance -= time
    const container = containers[nextContainerId]

    if (!container) {
        return
    }


    if (moveDistance <= 0) {
        container.style.top = `0px`
        container.style.bottom = `0px`
        window.requestAnimationFrame(showSlideAnimation(containers, windowHeight, nextContainerId - 1))
    } else {
        container.style.top = `-${moveDistance}px`
        container.style.bottom = `${moveDistance}px`
        window.requestAnimationFrame(showSlideAnimation(containers, moveDistance, nextContainerId))
    }
}

const setShowSlideAnimation = (ownProps) => (containers) => {
    const windowHeight = setWindowHeight()
    const totalContainers = Object.keys(containers).length

    for (let i = 1; i < totalContainers; i++) {
        const container = containers[i]
        container.style.top = `-${windowHeight}px`
        container.style.bottom = `${windowHeight}px`
    }

    window.requestAnimationFrame(showSlideAnimation(containers, windowHeight, totalContainers))
}

const onHideHeader = (ownProps) => (props) => {
    const {
        getContainer,
        isHeaderHide,
        handleChange
    } = props

    const container = getContainer()[1]
    if (!container) {
        return
    }

    const containerPosition = container.getBoundingClientRect().top
    const containerHeight  = (container.clientHeight * 0.5)
    const changeingPosition = (containerPosition + containerHeight)

    if (changeingPosition <= 0 && isHeaderHide) {
        handleChange('isHeaderHide', false)
    } else if (changeingPosition >= 0 && !isHeaderHide) {
        handleChange('isHeaderHide', true)
    }
}

// propsの変更を行わないhandler
const handleProps = {
    ...refHandler(),
    ...containerRefHandle(),
    scrollContainer,
    setShowSlideAnimation,
    onHideHeader
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
            scrollContainer,
            getContainer,
            getRefs,
            setShowSlideAnimation,
            onHideHeader
        } = this.props

        const windowHeight = setWindowHeight()

        const mainContainer = getRefs('container')
        const containers = getContainer()

        // 親要素の高さをcontainerの数に合わせて大きくする
        if (!mainContainer.style.height) {
            // 最後の要素はrefに登録していないので最後の要素文をプラス1する
            const totalContaners = Object.keys(containers).length
            mainContainer.style.height = `${windowHeight * totalContaners}px`
        }
        
        window.addEventListener('scroll', () => {
            scrollContainer(this.props, windowHeight)
            onHideHeader(this.props)
        })

        setTimeout(() => setShowSlideAnimation(containers), 100)
    },
    componentWillUnmount() {
        window.removeEventListener('scroll', () => {})
    },
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