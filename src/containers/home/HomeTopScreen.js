import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import DisplayComponent from '../../components/home/HomeTopScreen'

const display = "HomeTopScreen"

const initialProps = {
    containerId: 1,
    isContainerAnimes: {
        1: false,
        2: false,
        3: false
    }
}

const canRenderProps = [
    'containerId'
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

    if (containerId === Object.keys(containers).length + 1 || nextIsContainerAnimes[containerId]) {
        return
    }

    const documentElem = window.document.scrollingElement || window.document.documentElement
    let scrollPosition = documentElem.scrollTop
    const container = containers[containerId]
    const containerPosition = container.getBoundingClientRect().top + (window.pageYOffset / 1.5)
    if (containerPosition <= scrollPosition) {
        container.style.opacity = 1
        nextIsContainerAnimes[containerId] = true
        handleChange('isContainerAnimes', nextIsContainerAnimes)
        handleChange('containerId', containerId + 1)
    }
}

// propsの変更を行わないhandler
const handleProps = {
    ...refHandler(),
    slideShowContainer
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
        } = this.props
        const containers = getContainers()

        window.addEventListener('scroll', () => {
            slideShowContainer(this.props, containers)
        })
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