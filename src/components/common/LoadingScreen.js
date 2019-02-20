import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StyleSheet, css } from 'aphrodite'

export default function LoadingScreen(props) {
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
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    spinner: {
        fontSize: 40,
        color: '#e83e53',
        display: 'flex',
        textAlign: 'center'
    },
})