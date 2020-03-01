import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import DisplayComponent from '../../components/home/HomeTopScreen'
import { setWindowHeight } from '../../util/responsive';
import _ from 'lodash-es';

const display = "HomeTopScreen"
let _isMounted = false;
let _wasLoaded = false;

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
const handleChange = () => {
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
        setRef: () => name => e => (refs[name] = e),
        getRef: () => name => refs[name],
        setContainer: () => id => e => (containers[id] = e),
        getContainers: () => () => containers,
    }
}

const slideShowContainer = (ownProps) => (containers) => {
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

const onHideHeader = _.throttle((props) => {
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
}, 300);

// propsの変更を行わないhandler
const handleProps = {
    ...refHandler(),
    slideShowContainer
}

const handleOnHideHeader = (containers, props, isRemove) => () => {
    if(!isRemove && _isMounted) {
        props.slideShowContainer(containers);
        onHideHeader(props);
    }
};

// componentDidMountなどのライフサイクルを記述する
const lifeCycle = {
    componentDidMount() {
        _isMounted = true;
        const {
            getContainers,
            isContainerAnimes
        } = this.props
        const containers = getContainers()
        if(_wasLoaded) {
            const nextIsContainerAnimes = isContainerAnimes
            for (let i = 1; i < Object.keys(isContainerAnimes).length + 1; i++) {
                nextIsContainerAnimes[i] = false
            }
            handleChange('isContainerAnimes', nextIsContainerAnimes)
        }
        const totalContainers = Object.keys(containers).length
        for (let i = 1; i < totalContainers + 1; i++) {
            containers[i].style.opacity = 0
        }
        window.addEventListener('scroll', handleOnHideHeader(containers, this.props), { passive: true });
        if(!_wasLoaded) {
            _wasLoaded = true;
        }
    },
    componentWillUnmount() {
        _isMounted = false;
        window.removeEventListener('scroll', handleOnHideHeader([], this.props, true), { passive: true });
    }
}

const Enhance = compose(
    setDisplayName(display),
    withStateHandlers(
        initialProps,
        stateHandler
    ),
    withHandlers(handleProps),
    lifecycle(lifeCycle),
    onlyUpdateForKeys(canRenderProps),
)

export default Enhance(DisplayComponent)