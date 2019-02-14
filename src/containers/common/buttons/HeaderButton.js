import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import DisplayComponent from '../../../components/common/buttons/HeaderButton'

const display = "HeaderButton"

const initialProps = {
    isClicked: false,
    isStart: false,
    isEnd: false,
}

const canRenderProps = [
    'isClicked',
    'isStart',
    'isEnd',
    'isHide'
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
        getRef: (ownProps) => name => refs[name],
    }
}

let clickFlg = false
const onHeaderClick = (ownProps) => (props) => {
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
        handleChange('isEnd', false)
        Promise.resolve(setTimeout(() => {
            handleChange('isClicked', true)
            clickFlg = false
        }, 500))
    }else{
        handleChange('isEnd', true)
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
const lifeCycle = {}

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