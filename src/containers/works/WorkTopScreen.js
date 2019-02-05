import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import DisplayComponent from '../../components/works/WorkTopScreen'

const display = 'WorkTopScreen'

const initialProps = {
    list: [],
    isFetching: false,
    prevAnimation: null,
    prevFilter: null
}

const canRenderProps = [
    'list',
    'isFetching'
]

// propsの値を変更する
const handleChange = (ownProps) => {
    return (name, value) => {
        return {
            [name]: value
        }
    }
}

const onShowItem = (ownProps) => (animation, filter) => {
    const resetStyle = (animation, filter) => {
        animation.style.height = '400px'
        animation.style.overflowY = 'hidden'
        filter.style.display = 'block'
    }
    // １個前と同じ要素をクリックしていたらリセットする
    if(animation.style.height === '100%') {
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
    
    // ページ左上からの絶対座標を求める
    const rect = animation.getBoundingClientRect()
    const y = rect.top + window.pageYOffset
    // クリックした要素に移動
    window.scrollTo(0, y)

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
        getRefs: (ownProps) => () => refs
    }
}

// propsの変更を行わないhandler
const handleProps = {
    ...refHandler()
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