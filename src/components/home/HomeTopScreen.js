import React, { Fragment } from 'react'
import { css, StyleSheet } from 'aphrodite'

import GroupCirle from '../../containers/canvas/GroupCircle'

export default function HomeTopScreen(props) {
    const {
        setContainer,
        setRef,
        isContainerAnimes
    } = props
    const container1Aime = isContainerAnimes[1] ? 'slideLeft' : ""
    const container2Aime = isContainerAnimes[2] ? 'slideRight' : ""
    const container3Aime = isContainerAnimes[3] ? 'slideLeft' : ""
    console.log(isContainerAnimes)
    return (
        <Fragment>
            <div className={css(styles.container)}>
                <div className={css(styles.profileContainer)}>
                    <img src={require('../../assets/img/thumbnail.jpg')} className={css(styles.image)} />
                    <p className={css(styles.name)}>Keiya Sasaki</p>
                </div>
            </div>
            <div className={css(styles.detailContainer)}>
                <div
                    ref={setContainer(1)}
                    className={css(styles.detailItemContainer, styles[container1Aime])}
                    style={{ opacity: 1 }}
                    >
                    <h3 className={css(styles.detailItemTitle)}>Profile</h3>
                    <ul className={css(styles.profileList)}>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>生年月日</span>
                            <div style={{paddingTop: 10}}>
                                1999/02/10
                            </div>
                        </li>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>プログラミング歴</span>
                            <div style={{paddingTop: 10}}>
                                2017/06/01 ~ 現在
                            </div>
                        </li>
                    </ul>
                </div>
                <div
                    className={css(styles.detailItemContainer, styles[container2Aime])}
                    ref={setContainer(2)}
                    style={{ opacity: 1 }}
                >
                    <h3 className={css(styles.detailItemTitle)}>Language</h3>
                    <ul className={css(styles.detailItemList)}>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>Ruby(Ruby on Rails)</span>
                            <div className={css(styles.detailItemItemBody)}>
                                独学で1年間学習。その間に3つ程アプリを作成。
                            </div>
                        </li>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>PHP(FuelPHP)</span>
                            <div className={css(styles.detailItemItemBody)}>
                                アルバイト先の企業にてアプリ紹介サイト作成に半年ほど使用。
                            </div>
                        </li>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>Go</span>
                            <div className={css(styles.detailItemItemBody)}>
                                個人開発にてAPIサーバーなどの作成に使用。
                            </div>
                        </li>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>React</span>
                            <div className={css(styles.detailItemItemBody)}>
                                個人開発にてこのPortfolioやその他のサービスの作成に使用。
                            </div>
                        </li>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>ReactNative</span>
                            <div className={css(styles.detailItemItemBody)}>
                                アルバイト先の企業にて様々なアプリの作成に使用。
                            </div>
                        </li>
                    </ul>
                </div>
                <div
                    className={css(styles.detailItemContainer, styles[container3Aime])}
                    ref={setContainer(3)}
                    style={{ opacity: 1 }}
                >
                    <h3 className={css(styles.detailItemTitle)}>Career</h3>
                    <ul className={css(styles.detailItemList)}>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>2017/06/01</span>
                            <div className={css(styles.detailItemItemBody)}>
                                プログラミング学習開始
                            </div>
                        </li>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>2018/03/01</span>
                            <div className={css(styles.detailItemItemBody)}>
                                株式会社AppRunsでエンジニアとしてアルバイト
                            </div>
                        </li>
                    </ul>
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

const slideLeftAnim = [
    {
        '0%': {
            transform: 'translateX(-110%)'
        },
        '45%': {
            transform: 'translateX(7%)'
        },
        '100%': {
            transform: 'translateX(0)'
        }
    }
]

const slideRightAnim = [
    {
        '0%': {
            transform: 'translateX(110%)'
        },
        '45%':{
            transform: 'translateX(-7%)'
        },
        '100%': {
            transform: 'translateX(0)'
        }
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
        maxWidth: 480,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: 20,
        marginLeft: 10,
        border: 'solid 1px #F9CDAD',
        animationName: showImage,
        animationTimingFunction: 'easy',
        animationDuration: '2s',
        animationDelay: '0s',
        '@media(max-width: 480px)': {
            width: 55,
            height: 55,
        }
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
    },
    descriptionText: {
        color: '#555',
        fontSize: 15,
        marginBottom: 50,
        display: 'inline-block'
    },
    detailContainer: {
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff',
        padding: '20px 10px'
    },
    detailTitle: {
        fontSize: 50,
        color: '#e83e53',
        textAlign: 'center'
    },
    detailItemContainer: {
        width: '90%',
        maxWidth: 410,
        padding: '10px',
        paddingTop: 25,
        margin: '0 auto',
        marginBottom: 280,
        background: '#fff',
        borderRadius: 20,
    },
    detailItemTitle: {
        color: '#e83e53',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 50
    },
    profileList: {
        textAlign: 'center',
        listStyle: 'none',
        padding: 0,
    },
    detailItemList: {
        listStyle: 'none',
        padding: 0,
        padding: '0 10px',
        wordWrap: 'break-word',
    },
    detailItemItem: {
        fontSize: 16,
        color: '#757575',
        paddingBottom: 20,
        '@media(max-width: 480px)':{
            fontSize: 14
        }
    },
    detailItemItemTitle: {
        fontWeight: 'bold',
        color: '#FA776D',
    },
    detailItemItemBody: {
        paddingTop: 10,
        paddingLeft: 12
    },
    slideLeft: {
        animationName: slideLeftAnim,
        animationTimingFunction: 'easy-in',
        animationDuration: '1s',
        animationDelay: '0s',
    },
    slideRight: {
        animationName: slideRightAnim,
        animationTimingFunction: 'easy-in',
        animationDuration: '1s',
        animationDelay: '0s',
    }
})