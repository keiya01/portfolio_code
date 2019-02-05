import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StyleSheet, css } from 'aphrodite'

export default function Loading () {
    return (
        <div className={css(styles.loading)}>
            <FontAwesomeIcon
                icon='spinner'
                className={css(styles.spinner)}
                pulse
            />
        </div>
    )
}

const styles = StyleSheet.create({
    loading: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    spinner: {
        fontSize: 40,
        color: '#FA776D',
        display: 'flex',
        textAlign: 'center'
    }
})