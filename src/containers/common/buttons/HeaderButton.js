import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import DisplayComponent from '../../../components/common/buttons/HeaderButton'

const display = "HeaderButton"

const initialProps = {
    isClicked: false,
    isStart: false,
    isFinish: false,
}

const canRenderProps = [
    'isClicked',
    'isStart',
    'isFinish',
    'isHide'
]

// propsの値を変更する
const handleChange = () => {
    return (name, value) => {
        return {
            [name]: value
        }
    }
}

const resetAnimation = () => () => {
    return {
        isClicked: false,
        isStart: false,
        isFinish: false
    }
}

// propsの変更を行うhandler
const stateHandler = {
    handleChange,
    resetAnimation
}

const refHandler = () => {
    let refs = {}
    return {
        setRef: () => name => e => (refs[name] = e),
        getRef: () => name => refs[name],
    }
}

let isUnmouted = false
let clickFlg = false
const onHeaderClick = () => (props) => {
    if(isUnmouted) {
        return
    }

    const {
        isStart,
        handleChange
    } = props

    if(clickFlg) {
        return
    }

    clickFlg = true

    handleChange('isStart', !isStart)
    if(!isStart) {
        handleChange('isFinish', false)
        Promise.resolve(setTimeout(() => {
            handleChange('isClicked', true)
            clickFlg = false
        }, 150))
    }else{
        handleChange('isFinish', true)
        handleChange('isClicked', false)
        clickFlg = false
    }

}

// propsの変更を行わないhandler
const handleProps = {
    ...refHandler(),
    onHeaderClick
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
        isUnmouted = false
    },
    componentDidUpdate() {
        const {
            isHide,
            resetAnimation,
        } = this.props
        if(isHide) {
            resetAnimation()
        }
    },
    componentWillUnmount() {
        isUnmouted = true
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