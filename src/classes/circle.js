import Canvas from './canvas'

// クリックされた時の処理用にx座標とy座標とsizeを保存しておく
export let optionStore = []

export default class Circle extends Canvas {
    drawCircle = () => {
        const {
            context,
            name,
            positionX,
            positionY,
            size,
            color
        } = this
        this.setFillCanvas()
        context.arc(positionX, positionY, size, 0, Math.PI * 2)
        context.fill()
        if (optionStore.length < 3) {
            optionStore.push({ name, x: positionX, y: positionY, size, color })
        }
    }

    setShadow = () => {
        const {
            context,
        } = this
        context.shadowColor = '#eee'
        context.shadowBlur = 0.5
        context.shadowOffsetX = -0.5
        context.shadowOffsetY = 0.5
    }

    setText = () => {
        const {
            context,
            name,
            positionX,
            positionY,
        } = this

        context.beginPath()
        context.font = "bold 22px Franklin Gothic Medium"
        context.fillStyle = '#333'
        context.textAlign = "center";
        context.fillText(name, positionX, positionY + 5)
    }

    startClickAnimation = (props, navigate) => (timestamp) => {
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
        if (size > windowHeight && size > windowWidth) {
            switch (name) {
                case 'Works':
                    props.history.push('/works')
                    return
                case 'Blogs':
                    props.history.push('/blogs')
                    return
            }
            return
        }
        let animSize = size
        const animTime = 20
        const circle = new Circle(context, name, positionX, positionY, animSize + animTime, color)
        circle.drawCircle()
        window.requestAnimationFrame(circle.startClickAnimation(props))
    }

    onClick = (e, props) => {
        const {
            clientX,
            clientY
        } = e
        const {
            name,
            positionX,
            positionY,
            size
        } = this
        const rect = e.target.getBoundingClientRect()
        const clickX = clientX - rect.left
        const clickY = clientY - rect.top
        const clickPoint = (clickX - positionX) ** 2 + (clickY - positionY) ** 2
        const circleArea = size ** 2
        if (clickPoint < circleArea) {
            window.requestAnimationFrame(this.startClickAnimation(props))
        }
    }
}