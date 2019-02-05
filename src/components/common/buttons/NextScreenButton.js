import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Link } from 'react-router-dom'

export default function NextScreenButton(props) {
    const {
        uri,
        text,
    } = props
    return (
        <Link to={uri} style={{ textDecoration: 'none' }}>
            <div className={css(styles.btnContainer)}>
                <p className={css(styles.btnText)}>{text}</p>
            </div>
        </Link>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        textDecoration: 'none',
        width: '90%',
        height: '100%',
        maxWidth: 375,
        margin: '0 auto',
        backgroundColor: '#FC9D9A',
        padding: '15px 0',
        textAlign: 'center',
        borderRadius: 10
    },
    btnText: {
        fontSize: 16,
        color: '#fff',
    }
})