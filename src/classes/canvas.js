export default class Canvas {
    constructor(canvasContext, name = '', x = 0, y = 0, size = 0, color = 'black') {
        this.context = canvasContext
        this.name = name
        // canvasは浮動小数点を使うと遅くなるため整数にする
        this.positionX = Math.floor(x)
        this.positionY = Math.floor(y)
        this.size = Math.floor(size)
        this.color = color
    }

    setFillCanvas = () => {
        const {
            context,
            color,
        } = this
        context.beginPath()
        context.fillStyle = color
    }
}