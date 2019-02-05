import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import DisplayComponent from '../../components/blogs/BlogTopScreen'

const display = 'BlogTopScreen'

const initialProps = {
}

const canRenderProps = [
    
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
    return {
        ...state
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