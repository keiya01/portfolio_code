import { compose, withStateHandlers, setDisplayName, lifecycle, pure, withHandlers } from 'recompose'
import { withRouter } from 'react-router'
import ScrollToTop from '../components/ScrollToTop'


const display = "ScrollToTop"
const component = ScrollToTop

const initialProps = {
}

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

// propsの変更を行わないhandler
const handleProps = (ownProps) => ({
})

// componentDidMountなどのライフサイクルを記述する
const lifeCycle = {
    componentDidUpdate(prevProps) {
        console.log('scroll: ', prevProps, this.props)
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
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
    withRouter,
    lifecycle(lifeCycle),
    pure
)

export default Enhance(withRouter(component))