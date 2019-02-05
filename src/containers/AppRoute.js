import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import * as Works from '../modules/works'

import AppRoute from '../components/AppRoute'


const display = "AppRoute"
const component = AppRoute

const initialProps = {
    list: []
}

const canRenderProps = []

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

const redirectHashUri = (ownProps) => () => {
    const { location } = window
    let uri = location.href

    const hasHash = uri.includes('/#/')
    if (!hasHash) {
        // http://example.com/ 最後に「 / 」が入っていないなら付ける
        if (uri.slice(-1) !== '/') {
            // 最後の文字以外を取得
            uri += '/'
        }
        // 指定のuriに遷移
        window.location = uri + '#/'
    }
}

// propsの変更を行わないhandler
const handleProps = (ownProps) => ({
    redirectHashUri,
})

const mapStateToProps = (state) => {
    const {
        data
    } = state.works
    return {
        list: data
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getWorks: () => dispatch(Works.getWorks())
})

// componentDidMountなどのライフサイクルを記述する
const lifeCycle = {
    componentWillMount() {
        const {
            list,
            getWorks,
            redirectHashUri
        } = this.props
        if (list.length === 0) {
            getWorks()
        }
        redirectHashUri()
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

export default Enhance(component)