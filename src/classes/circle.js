import Canvas from './canvas'

// クリックされた時の処理用にx座標とy座標とsizeを保存しておく
export let optionStore = []
let tempStore = []

export default class Circle extends Canvas {
    constructor(context, name, positionX, positionY, size, color, text = "") {
        super(context, name, positionX, positionY, size, color)
        this.text = text
        this.canvasStore = []
    }
    drawCircle = (isSaveStore = true) => {
        const {
            context,
            name,
            positionX,
            positionY,
            size,
            color,
            text,
        } = this
        this.setFillCanvas()
        context.arc(positionX, positionY, size, 0, Math.PI * 2)
        context.fill()
        if(isSaveStore) {
            if (tempStore.length === 2) {
                tempStore = []
            }
            tempStore.push({ name, x: positionX, y: positionY, size, color, text })
            if(tempStore.length === 2) {
                optionStore = []
                optionStore.push(...tempStore)
            }
        }
    }

    setShadow = (moveDistanceY = null) => {
        const {
            context,
        } = this
        context.shadowColor = '#555'
        context.shadowOffsetX = -0.5
        context.shadowOffsetY = moveDistanceY !== null ? moveDistanceY : 2
        context.shadowBlur = moveDistanceY !== null ? 1 : 8
    }

    resetShadow = () => {
        const {
            context
        } = this
        context.shadowColor = '#fff'
        context.shadowOffsetX = 0
        context.shadowOffsetY = 0
        context.shadowBlur = 0
    }

    setTitle = () => {
        const {
            context,
            name,
            positionX,
            positionY,
        } = this

        context.beginPath()
        context.font = "bold 40px Arial"
        context.fillStyle = '#333'
        context.textAlign = "center";
        context.fillText(name, positionX, positionY)
    }

    setText = () => {
        const {
            context,
            text,
            positionX,
            positionY,
        } = this

        context.beginPath()
        context.font = `normal 25px 游ゴシック`
        context.fillStyle = '#555'
        context.textAlign = "center";
        context.fillText(text, positionX, positionY + 50)
    }

    clickAnimation = (nextAnimation, constantSize, props) => (timestamp) => {
        const {
            context,
            name,
            size,
            positionY
        } = this
        // const {
        //     windowHeight,
        //     windowWidth,
        // } = props

        const windowHeight = window.innerHeight
        const windowWidth = window.innerWidth

        const animTime = 3
        const animSize = size
        const animY = positionY
        if (animSize <= constantSize - 25) {
            window.requestAnimationFrame(nextAnimation)
            return
        }

        // クリックされた円を保存しておく
        let activeCircle = {}
        // 描画をリセット
        context.clearRect(0, 0, windowWidth * 2, windowHeight * 2)
        
        // 再描画と同時にクリックされた円を縮小させる
        for (let i = 0; i < optionStore.length; i++) {
            const {
                name: optionName,
                x: optionX,
                y: optionY,
                size: optionSize,
                color: optionColor,
                text: optionText
            } = optionStore[i]

            const isActiveCircle = optionName === name

            const nextSize = isActiveCircle ? animSize - animTime : optionSize
            const nextY = isActiveCircle ? animY + 2 : optionY
            const circle = new Circle(context, optionName, optionX, nextY, nextSize, optionColor, optionText)
            if (isActiveCircle) {
                activeCircle = circle
                circle.setShadow(0.1)
            }else{
                circle.setShadow()
            }
            circle.drawCircle()
            circle.resetShadow()
            circle.setTitle()
            circle.setText()
        }
        window.requestAnimationFrame(activeCircle.clickAnimation(nextAnimation, constantSize, props))
    }

    transitionAnimation = (props) => (timestamp) => {
        const {
            windowHeight,
            windowWidth,
        } = props
        const {
            context,
            name,
            positionX,
            positionY,
            size,
            color,
        } = this
        if (size > windowHeight * 2 && size > windowWidth * 2) {
            switch (name) { // eslint-disable-line default-case
                case 'Works':
                    props.history.push('/works')
                    return
                case 'Blog':
                    props.history.push('/blogs')
                    return
            }
            return
        }

        let animSize = size
        const ua = navigator.userAgent.toLowerCase()
        // PC用のアニメーションスピード
        let animTime = 80
        // スマホ用のアニメーションスピード
        if(ua.match(/android|iphone/) !== null) {
            animTime = 60
        }
        const circle = new Circle(context, name, positionX, positionY, animSize + animTime, color)
        circle.drawCircle(false)

        window.requestAnimationFrame(circle.transitionAnimation(props))
    }

    onClick = (e, props) => {
        const {
            clientX,
            clientY
        } = e
        const {
            positionX,
            positionY,
            size
        } = this
        const rect = e.target.getBoundingClientRect()
        const clickX = clientX * 2 - rect.left
        const clickY = clientY * 2 - rect.top
        const clickPoint = (clickX - positionX) ** 2 + (clickY - positionY) ** 2
        const circleArea = size ** 2
        if (clickPoint < circleArea) {
            return true
        }
        return false
    }
}