import React, { Component, Fragment } from 'react'
import { css, StyleSheet } from 'aphrodite'

export default class GroupCircle extends Component {
    render() {
        const {
            setRef,
            onCircleClick,
            canvas,
            windowWidth,
            windowHeight
        } = this.props
        if (canvas !== null) {
            canvas.addEventListener('click', onCircleClick(this.props))
        }

        const title = 'Information'
        return (
            <div className={css(styles.wrapper)} >
                <div className={css(styles.titleWrapper)}>
                    <h3 className={css(styles.infoTitle, styles.fontResize)}>{title}</h3>
                </div>
                <canvas
                    ref={e => setRef(e, "canvas")}
                    className={css(styles.canvas)}
                    // width={windowWidth}
                    // height={windowHeight}
                    style={{width: windowWidth, height: windowHeight}}
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
    },
    titleWrapper: {
        display: 'inline-block',
        position: 'absolute',
        top: '10%',
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    infoTitle: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff'
    },
    fontResize: {
        '@media (max-width: 600px)': {
            fontSize: 30,
        }
    },
    canvas: {
        backgroundColor: '#FF0066'
    },
})