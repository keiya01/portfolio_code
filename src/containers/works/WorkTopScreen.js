import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import DisplayComponent from '../../components/works/WorkTopScreen'

const display = 'WorkTopScreen'

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
        setRef: (ownProps) => name => e => (refs[name] = e),
        getRef: (ownProps) => name => refs[name]
    }
}

const onHideHeader = (ownProps) => (props) => {
    const {
        getRef,
        isHeaderHide,
        handleChange
    } = props

    const container = getRef('container')
    if (!container) {
        return
    }

    const containerPosition = container.getBoundingClientRect().top
    const containerHeight  = container.clientHeight
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

const mapDispatchToProps = (dispatch, ownProps) => ({
})

// componentDidMountなどのライフサイクルを記述する
const lifeCycle = {
    componentDidMount() {
        const {
            getRef,
            onHideHeader
        } = this.props
        const wrapper = getRef('scrollContainer')
        wrapper.addEventListener('scroll', () => {
            onHideHeader(this.props)
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