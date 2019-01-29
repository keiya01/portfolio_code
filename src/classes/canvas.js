export default class Canvas {
    constructor(canvasContext, name = '', x = 0, y = 0, size = 0, color = 'black') {
        this.context = canvasContext
        this.name = name
        this.positionX = x
        this.positionY = y
        this.size = size
        this.color = color
    }

    setFillCanvas = () => {
        const {
            context,
            name,
            positionX,
            positionY,
            color,
        } = this
        context.beginPath()
        context.fillStyle = color
    }
}