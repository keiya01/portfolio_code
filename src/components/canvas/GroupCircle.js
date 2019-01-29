import React, { Component, Fragment } from 'react'
import { css, StyleSheet } from 'aphrodite'

export default class GroupCircle extends Component {
    render() {
        const {
            setRef,
            onCircleClick,
            canvas,
            onResize,
            setCircle,
            windowHeight,
            windowWidth,
            children
        } = this.props
        if (canvas !== null) {
            canvas.addEventListener('click', onCircleClick(this.props))
        }

        return (
            <div className={css(styles.wrapper)} >
                <canvas
                    ref={e => setRef(e, "canvas")}
                    className={css(styles.canvas)}
                    width={windowWidth}
                    height={windowHeight}
                />
            </div>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#eee',
    },
    canvas: {
        backgroundColor: '#F5F5DC'
    }
})