import React, { Component, Fragment } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Link } from 'react-router-dom'

export default class PreparationScreen extends Component {
    render() {
        return (
            <div className={css(styles.container)}>
                <h3 className={css(styles.message)}>準備中です...</h3>
                <Link to='/' className={css(styles.link)}>トップへ</Link>
            </div>
        )
    }
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
        color: 'tomato',
        fontSize: 25
    },
    link: {
        marginTop: 30,
        textAlign: 'center',
        color: 'blue',
        fontSize: 16,
        textDecoration: 'none'
    }
})