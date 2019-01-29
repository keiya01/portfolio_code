import React, { Component, Fragment } from 'react'
import { css, StyleSheet } from 'aphrodite'

import GroupCirle from '../../containers/canvas/GroupCircle'

export default class HomeTopScreen extends Component {
    render() {
        return (
            <Fragment>
                <div className={css(styles.container)}>
                    <div className={css(styles.textContainer)} style={{paddingBottom: 50}}>
                        <img src={require('../../assets/img/thumbnail.jpg')} className={css(styles.image)} />
                        <p className={css(styles.name)}>Keiya Sasaki</p>
                    </div>
                    <div className={css(styles.textContainer)}>
                        <p className={css(styles.simpleText)}>
                            about me
                        </p>
                    </div>
                </div>
                <GroupCirle history={this.props.history} />
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: 20,
        border: 'solid 1px #BDB76B',
    },
    name: {
        fontSize: 20,
        color: '#333',
        fontWeight: 600,
    },
    textContainer: {
        display: 'flex',
        maxWidth: 360,
        width: '90%',
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    simpleText: {
        textAlign: 'left',
        color: '#555',
        fontSize: 15,
    },
})