import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Link } from 'react-router-dom'

export default function PreparationScreen() {
    return (
        <div className={css(styles.container)}>
            <h3 className={css(styles.message)}>準備中です...</h3>
            <Link to='/' className={css(styles.link)}>トップへ</Link>
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fff'
    },
    message: {
        textAlign: 'center',
        color: '#FA776D',
        fontSize: 25
    },
    link: {
        marginTop: 30,
        textAlign: 'center',
        color: '#4EA1D5',
        fontSize: 16,
        textDecoration: 'none'
    }
})