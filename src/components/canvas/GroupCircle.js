import React from 'react'
import { css, StyleSheet } from 'aphrodite'

export default function GroupCircle(props) {
    const {
        setRef,
        onCircleClick,
        canvas,
        windowWidth,
        windowHeight
    } = props
    if (canvas !== null) {
        canvas.addEventListener('click', onCircleClick(props))
    }

    const title = 'Information'
    return (
        <div className={css(styles.wrapper)} >
            <div className={css(styles.titleWrapper, styles.movePosition)}>
                <h3 className={css(styles.infoTitle, styles.fontResize)}>{title}</h3>
            </div>
            <canvas
                ref={e => setRef(e, "canvas")}
                className={css(styles.canvas)}
                style={{ width: windowWidth, height: windowHeight }}
            />
        </div>
    )
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
    movePosition: {
        '@media (max-width: 450px)': {
            top: '20%'
        }
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
        backgroundColor: '#FA776D'
    },
})