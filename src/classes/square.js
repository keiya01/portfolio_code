import Canvas from "./canvas";

export default class Squeare extends Canvas {
    constructor(firstX, firstY, secondX, secondY) {
        super(firstX, firstY, secondX, secondY)
    }

    drawSquare = () => {
        const {
            context,
            positionX,
            positionY,
            firstX, 
            firstY, 
            secondX, 
            secondY
        } = this
        this.setFillCanvas()
        context.moveTo(positionX, positionY);
        context.lineTo(firstX, firstY);
        context.lineTo(secondX, secondY);
        context.fill()
    }
}