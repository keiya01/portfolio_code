import React, { Fragment } from 'react'
import { css, StyleSheet } from 'aphrodite'

import GroupCirle from '../../containers/canvas/GroupCircle'
import HeaderButton from '../../containers/common/buttons/HeaderButton'
import FingerDown from '../common/icon/FingerDown';

export default function HomeTopScreen(props) {
    const {
        setContainer,
        setRef,
        isContainerAnimes,
        isHeaderHide
    } = props
    const container1Aime = isContainerAnimes[1] ? 'slideLeft' : ""
    const container2Aime = isContainerAnimes[2] ? 'slideRight' : ""
    const container3Aime = isContainerAnimes[3] ? 'slideLeft' : ""
    return (
        <Fragment>
            <div className={css(styles.container)}>
                <HeaderButton currentPage='home' isHide={isHeaderHide} />
                <div className={css(styles.profileContainer)}>
                    <img src={require('../../assets/img/thumbnail.jpg')} alt="サムネイル画像" className={css(styles.image)} />
                    <p className={css(styles.name)}>Keiya Sasaki</p>
                </div>
                <FingerDown position={{bottom: 100, left: '48%'}} delay={2000}/>
            </div>
            <div className={css(styles.detailContainer)}>
            <div className={css(styles.line)}/>
                <div
                    ref={setContainer(1)}
                    className={css(styles.detailItemContainer, styles[container1Aime])}
                    style={{ opacity: 1 }}
                >
                    <h3 className={css(styles.detailItemTitle)}>Profile</h3>
                    <table className={css(styles.profileList)} style={{ margin: '0 auto', textAlign: 'center' }}>
                        <tbody>
                            <tr className={css(styles.detailItemItem)}>
                                <td className={css(styles.detailItemItemTitle, styles.profileTable)} >生年月日</td><td>1999/02/10</td>
                            </tr>
                            <tr className={css(styles.detailItemItem)}>
                                <td className={css(styles.detailItemItemTitle, styles.profileTable)}>好きな言語</td><td>TypeScript, Go</td>
                            </tr>
                            <tr className={css(styles.detailItemItem)}>
                                <td className={css(styles.detailItemItemTitle, styles.profileTable)}>興味分野</td><td>UI/UX, WEBフロントエンド</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={css(styles.line)}/>
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
                                独学で<span style={{ fontWeight: 'bold' }}>1年間</span>学習。その間に3つ程アプリを作成。
                            </div>
                        </li>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>PHP(Laravel, FuelPHP)</span>
                            <div className={css(styles.detailItemItemBody)}>
                                アルバイト先の企業にてアプリ紹介サイト作成に<span style={{ fontWeight: 'bold' }}>1年ほど</span>使用。
                            </div>
                        </li>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>Go</span>
                            <div className={css(styles.detailItemItemBody)}>
                                個人開発にて<span style={{ fontWeight: 'bold' }}>1年ほど</span>APIサーバーなどの作成に使用。
                            </div>
                        </li>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>React</span>
                            <div className={css(styles.detailItemItemBody)}>
                                個人開発にて<span style={{ fontWeight: 'bold' }}>1年ほど</span>このPortfolioやその他のサービスの作成に使用。
                            </div>
                        </li>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>ReactNative</span>
                            <div className={css(styles.detailItemItemBody)}>
                                アルバイト先の企業にて<span style={{ fontWeight: 'bold' }}>1年以上</span>、様々なアプリの作成に使用。
                            </div>
                        </li>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>Typescript</span>
                            <div className={css(styles.detailItemItemBody)}>
                                個人開発にてAPIやアプリの作成に<span style={{ fontWeight: 'bold' }}>1年ほど</span>使用。
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={css(styles.line)}/>
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
                            <span className={css(styles.detailItemItemTitle)}>2018/03/01 ~ 2019/09/30</span>
                            <div className={css(styles.detailItemItemBody)}>
                                株式会社AppRunsにてエンジニアとしてアルバイトを経験
                            </div>
                        </li>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>2019/03/18 ~ 03/29</span>
                            <div className={css(styles.detailItemItemBody)}>
                                ウォンテッドリー株式会社にて2週間のインターンを経験
                            </div>
                        </li>
                        <li className={css(styles.detailItemItem)}>
                            <span className={css(styles.detailItemItemTitle)}>2019/08/19 ~ 08/30</span>
                            <div className={css(styles.detailItemItemBody)}>
                                ヤフー株式会社にて2週間のインターンを経験
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div ref={setRef('circleContainer')}>
                <GroupCirle history={props.history} />
            </div>
        </Fragment >
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
        'from': {
            opacity: 0,
            transform: 'translateX(-20%)'
        },
        'to': {
            opacity: 1,
            transform: 'translateX(0)'
        }
    }
]

const slideRightAnim = [
    {
        'from': {
            opacity: 0,
            transform: 'translateX(20%)'
        },
        'to': {
            opacity: 1,
            transform: 'translateX(0)'
        }
    }
]

const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
    },
    line:{
        width: '100%',
        border: '1px solid #eee'
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
        backgroundColor: '#fff',
    },
    detailTitle: {
        fontSize: 50,
        color: '#e83e53',
        textAlign: 'center'
    },
    detailItemContainer: {
        width: '90%',
        maxWidth: 410,
        padding: '80px 10px',
        margin: '100px auto',
        background: '#fff',
    },
    detailItemTitle: {
        color: '#e83e53',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 50
    },
    profileList: {
        listStyle: 'none',
        padding: 0,
    },
    profileTable: {
        textAlign: 'center',
        width: '40%',
        paddingBottom: 8
    },
    detailItemList: {
        listStyle: 'none',
        padding: '0 10px',
        wordWrap: 'break-word',
    },
    detailItemItem: {
        fontSize: 16,
        color: '#757575',
        paddingBottom: 20,
        '@media(max-width: 480px)': {
            fontSize: 14
        }
    },
    detailItemItemTitle: {
        fontWeight: 'bold',
        color: '#FA776D',
    },
    detailItemItemBody: {
        paddingTop: 10,
        paddingLeft: 12,
        letterSpacing: '0.05em'
    },
    slideLeft: {
        animationName: slideLeftAnim,
        animationTimingFunction: 'easy-in',
        animationDuration: '500ms',
    },
    slideRight: {
        animationName: slideRightAnim,
        animationTimingFunction: 'easy-in',
        animationDuration: '500ms',
    }
})