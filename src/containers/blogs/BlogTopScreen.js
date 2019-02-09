import { compose, withStateHandlers, setDisplayName, lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { ReactDOM } from 'react'

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

const containerRefHandle = () => {
    let refs = {}
    return {
        setContainer: (ownProps) => name => e => (refs[name] = e),
        getContainer: (ownProps) => () => refs
    }
}

const refHandler = () => {
    let refs = {}
    return {
        setRef: (ownProps) => name => e => (refs[name] = e),
        getRefs: (ownProps) => (name) => refs[name]
    }
}

const scrollContainer = (ownProps) => (props) => {
    const {
        getContainer,
    } = props


    const containers = getContainer()
    let scrollPosition = document.documentElement.scrollTop
    const slideCount = Math.floor(scrollPosition / window.innerHeight)
    const container = containers[slideCount + 1]
    if (!container) {
        return
    }

    // scrollPositionが1倍以上なら画面の大きさに対して倍率が0になるように調整する
    if (slideCount >= 1) {
        scrollPosition -= (window.innerHeight * slideCount)
    }

    container.style.top = `-${scrollPosition}px`
    container.style.bottom = `${scrollPosition}px`

}

// propsの変更を行わないhandler
const handleProps = {
    ...refHandler(),
    ...containerRefHandle(),
    scrollContainer
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
            scrollContainer,
            getContainer,
            getRefs,
        } = this.props

        const mainContainer = getRefs('container')
        const containers = getContainer()

        if (!mainContainer.style.height) {
            console.log('changeHeight!!')
            const totalContaners = Object.keys(containers).length
            mainContainer.style.height = `${window.innerHeight * totalContaners}px`
        }

        window.addEventListener('scroll', () => {
            scrollContainer(this.props)
        })
        window.addEventListener('touchmove', () => {
            scrollContainer(this.props)
        })
    },
    componentWillUnmount() {
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

export default Enhance(DisplayComponent)