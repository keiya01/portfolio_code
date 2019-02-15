import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import DisplayComponent from '../../components/home/HomeTopScreen'
import { setWindowHeight } from '../../util/responsive';

const display = "HomeTopScreen"

const initialProps = {
    containerId: 1,
    isContainerAnimes: {
        1: false,
        2: false,
        3: false
    },
    isHeaderHide: true
}

const canRenderProps = [
    'containerId',
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

const refHandler = () => {
    let refs = {}
    let containers = {}
    return {
        setRef: (ownProps) => name => e => (refs[name] = e),
        getRef: (ownProps) => name => refs[name],
        setContainer: (ownProps) => id => e => (containers[id] = e),
        getContainers: (ownProps) => () => containers,
    }
}

const slideShowContainer = (ownProps) => (props, containers) => {
    const {
        containerId,
        isContainerAnimes,
        handleChange
    } = ownProps

    const nextIsContainerAnimes = isContainerAnimes

    if (containerId >= Object.keys(containers).length + 1 || nextIsContainerAnimes[containerId]) {
        return
    }

    const documentElem = window.document.scrollingElement || window.document.documentElement
    let scrollPosition = documentElem.scrollTop
    const container = containers[containerId]
    if (!container) return
    const windowHeight = setWindowHeight()
    const containerPosition = (container.getBoundingClientRect().top + window.pageYOffset) - (windowHeight / 2)
    if (containerPosition <= scrollPosition) {
        container.style.opacity = 1
        nextIsContainerAnimes[containerId] = true
        handleChange('isContainerAnimes', nextIsContainerAnimes)
        handleChange('containerId', containerId + 1)
    }
}

const onHideHeader = (ownProps) => (props) => {
    const {
        getRef,
        isHeaderHide,
        handleChange
    } = props

    if(30 > window.pageYOffset > 0 && isHeaderHide) {
        handleChange('isHeaderHide', false)
        return
    }

    const circleContainer = getRef('circleContainer')
    if (!circleContainer) {
        return
    }

    const containerPosition = circleContainer.getBoundingClientRect().top

    if (containerPosition <= 30) {
        handleChange('isHeaderHide', true)
    } else if (containerPosition >= 0 && isHeaderHide) {
        handleChange('isHeaderHide', false)
    }
}

// propsの変更を行わないhandler
const handleProps = {
    ...refHandler(),
    slideShowContainer,
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
            getContainers,
            slideShowContainer,
            onHideHeader
        } = this.props
        const containers = getContainers()
        const totalContainers = Object.keys(containers).length
        for (let i = 1; i < totalContainers + 1; i++) {
            containers[i].style.opacity = 0
        }

        window.addEventListener('scroll', () => {
            slideShowContainer(this.props, containers)
            onHideHeader(this.props)
        })
    },
    componentWillUnmount() {
        const {
            isContainerAnimes,
            getContainers,
            handleChange
        } = this.props
        const nextIsContainerAnimes = isContainerAnimes
        for (let i = 1; i < Object.keys(isContainerAnimes).length + 1; i++) {
            nextIsContainerAnimes[i] = false
        }
        handleChange('isContainerAnimes', nextIsContainerAnimes)
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