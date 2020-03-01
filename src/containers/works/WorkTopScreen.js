import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import _ from 'lodash-es';
import * as Works from '../../modules/works';
import DisplayComponent from '../../components/works/WorkTopScreen';

const display = 'WorkTopScreen'
let _isMounted = false;

const initialProps = {
    list: [],
    isFetching: false,
    prevAnimation: null,
    prevFilter: null,
    isHeaderHide: true
}

const canRenderProps = [
    'list',
    'isFetching',
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

const onShowItem = (ownProps) => (animation, filter, props) => {
    const resetStyle = (animation, filter) => {
        animation.style.height = '400px'
        animation.style.overflowY = 'hidden'
        filter.style.display = 'block'
    }
    
    // １個前と同じ要素をクリックしていたらリセットする
    if (animation.style.height === '100%') {
        resetStyle(animation, filter)
        return {
            prevAnimation: null,
            prevFilter: null
        }
    }
    
    // １個前にクリックした要素をリセットする
    const {
        prevAnimation,
        prevFilter
    } = ownProps
    if (prevAnimation && prevFilter) {
        resetStyle(prevAnimation, prevFilter)
    }
    
    // クリックされた要素を表示する
    animation.style.height = '100%'
    animation.style.overflowY = 'none'
    filter.style.display = 'none'
    
    // クリックしたアイテムの位置
    const itemRect = animation.getBoundingClientRect()
    
    // スクロールする要素
    const overflowScroll = props.getRef('overflowScroll')

    // クリックしたアイテムの位置
    let y = overflowScroll.scrollTop + itemRect.top

    // アイテムの表示箇所に移動
    overflowScroll.scrollTop = y - 30
    
    return {
        prevAnimation: animation,
        prevFilter: filter
    }
}

// propsの変更を行うhandler
const stateHandler = {
    handleChange,
    onShowItem
}

const refHandler = () => {
    let refs = {}
    return {
        setRef: () => name => e => (refs[name] = e),
        getRef: () => name => refs[name]
    }
}

const onHideHeader = (props) => {
    const {
        getRef,
        handleChange
    } = props;

    const container = getRef('container')
    if (!container) {
        return
    }

    const containerPosition = container.getBoundingClientRect().top
    const containerHeight  = container.clientHeight
    const changingPosition = (containerPosition + containerHeight)

    if (changingPosition <= 0) {
        handleChange('isHeaderHide', false)
    } else if (changingPosition >= 0) {
        handleChange('isHeaderHide', true)
    }
}

// propsの変更を行わないhandler
const handleProps = {
    ...refHandler(),
    onHideHeader,
}

const mapStateToProps = (state) => {
    const {
        data,
        isFetching
    } = state.works
    return {
        list: data,
        isFetching
    }
}

const mapDispatchToProps = (dispatch) => ({
    getWorks: () => dispatch(Works.getWorks())
})

const handleOnHideHeader = (props, isRemove) => _.throttle(() => {
    if(!isRemove && _isMounted) {
        onHideHeader(props);
    }
}, 500);

// componentDidMountなどのライフサイクルを記述する
const lifeCycle = {
    componentDidMount() {
        _isMounted = true;
        this.props.getWorks()
        const wrapper = this.props.getRef('scrollContainer')
        wrapper.addEventListener('scroll', handleOnHideHeader(this.props), { passive: true })
    },
    componentWillUnmount() {
        _isMounted = false;
        const wrapper = this.props.getRef('scrollContainer')
        wrapper.removeEventListener('scroll', handleOnHideHeader(this.props, true), { passive: true });
    }
}

const Enhance = compose(
    setDisplayName(display),
    withStateHandlers(
        initialProps,
        stateHandler
    ),
    withHandlers(handleProps),
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle(lifeCycle),
    onlyUpdateForKeys(canRenderProps),
)

export default Enhance(DisplayComponent)