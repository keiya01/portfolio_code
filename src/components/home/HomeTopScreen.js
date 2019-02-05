import React, { Fragment } from 'react'
import { css, StyleSheet } from 'aphrodite'

import GroupCirle from '../../containers/canvas/GroupCircle'

export default function HomeTopScreen(props) {
    return (
        <Fragment>
            <div className={css(styles.container)}>
                <div className={css(styles.profileContainer)} style={{ paddingBottom: 50 }}>
                    <img src={require('../../assets/img/thumbnail.jpg')} className={css(styles.image)} />
                    <p className={css(styles.name)}>Keiya Sasaki</p>
                </div>
                <div
                    className={css(styles.descriptionContainer)}
                    style={{ opacity: 0 }}
                    ref={props.setRef('divDescription')}
                >
                    <table className={css(styles.descriptionText)}>
                        <tbody>
                            <tr>
                                <td>生年月日</td><td>1999/02/10</td>
                            </tr>
                            <tr>
                                <td style={{ width: '40%' }}>プログラミング歴</td><td>2017/06/01 〜 現在</td>
                            </tr>
                            <tr>
                                <td>言語</td><td>Ruby(Ruby on Rails), PHP(FuelPHP), Go, React, ReactNative</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <p className={css(styles.descriptionText)}>ちなみにこのサイトはReactで書いています。</p><br />
                    <span style={{ color: '#FC9D9A', fontWeight: 'bold' }}>Career</span><br />
                    <table className={css(styles.descriptionText)}>
                        <tbody>
                            <tr>
                                <td>2017/06/01</td><td>プログラミング学習開始</td>
                            </tr>
                            <tr>
                                <td>2018/03/01</td><td>株式会社AppRunsでエンジニアとしてアルバイト</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <GroupCirle history={props.history} />
        </Fragment>
    )
}

const showImage = [
    {
        'from': {
            transform: 'translate(55%, 0)'
        },
        'to': {
            transform: 'translate(0, 0)'
        }
    }
]

const showUserName = [
    {
        'from': {
            opacity: 0,
        },
        'to': {
            opacity: 1,
        },
    }
]

const showDescription = [
    {
        'from': {
            opacity: 0,
            transform: 'translate(0, 100px)'
        },
        'to': {
            opacity: 1,
            transform: 'translate(0, 0)'
        },
    }
]

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
    },
    profileContainer: {
        display: 'flex',
        margin: '0 auto',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: 20,
        border: 'solid 1px #F9CDAD',
        animationName: showImage,
        animationTimingFunction: 'easy',
        animationDuration: '2s',
        animationDelay: '0s'
    },
    name: {
        fontSize: 20,
        color: '#757575',
        fontWeight: 600,
        animationName: showUserName,
        animationTimingFunction: 'easy',
        animationDuration: '4s',
        animationDelay: '0s'
    },
    descriptionContainer: {
        width: '90%',
        maxWidth: 480,
        margin: '0 auto',
        paddingLeft: 20,
        animationName: showDescription,
        animationDuration: '3s',
        animationTimingFunction: 'ease',
        animationDelay: '2s',
    },
    descriptionText: {
        color: '#555',
        fontSize: 15,
    },
})