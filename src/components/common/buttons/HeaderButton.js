import React, { Fragment } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Link } from 'react-router-dom'

const MenuItem = (props) => {
    const {
        currentPage,
        id,
        name,
        uri
    } = props

    if (currentPage === id) {
        return (
            <p className={css(styles.menuTitle)} style={{ fontWeight: '800' }}>
                {name}
            </p>
        )
    } else {
        return <Link to={uri} className={css(styles.menuTitle)}>{name}</Link>
    }

}

const setHubergerAnimation = (isStart, isFinish) => {
    switch (true) {
        case isStart:
            return {
                top: 'openHumbergerTop',
                middle: 'openHumbergerMiddle',
                bottom: 'openHumbergerBottom'
            }
        case isFinish:
            return {
                top: 'closeHumbergerTop',
                middle: 'closeHumbergerMiddle',
                bottom: 'closeHumbergerBottom'
            }
        default:
            return {
                top: null,
                middle: null,
                bottom: null
            }
    }
}

export default function HeaderButton(props) {

    const {
        currentPage,
        isClicked,
        isStart,
        isFinish,
        isHide,
        onHeaderClick
    } = props

    const pages = [
        {
            id: 'home',
            name: 'Home',
            uri: '/'
        },
        {
            id: 'blog',
            name: 'Blog',
            uri: '/blogs'
        },
        {
            id: 'works',
            name: 'Works',
            uri: '/works'
        }
    ]

    const startAnimation = isStart && 'clickedShowAnimation'
    const endAnimation = isFinish && 'clickedHideAnimation'
    const headerContainer = isClicked ? 'menuContainer' : 'btnContainer'
    const humbergerAnimation = setHubergerAnimation(isStart, isFinish)

    if (isStart) {
        window.addEventListener('click', () => {
            onHeaderClick(props)
        })
    }

    return (
        <Fragment>
            {
                !isHide
                &&
                <div
                    className={css(
                        styles.header,
                        styles[headerContainer],
                        styles[startAnimation],
                        styles[endAnimation]
                    )}
                    style={{ display: 'flex' }}
                    onClick={() => onHeaderClick(props)}
                >
                    <div className={css(styles.humbergerContainer)}>
                        <div className={css(styles.humbergerTop, styles[humbergerAnimation.top])} />
                        <div className={css(styles.humbergerMiddle, styles[humbergerAnimation.middle])} />
                        <div className={css(styles.humbergerBottom, styles[humbergerAnimation.bottom])} />
                    </div>
                    {
                        isClicked
                        &&
                        <div className={css(styles.menu)}>
                            {
                                pages.map(item => {
                                    return (
                                        <Fragment key={item.id}>
                                            <MenuItem
                                                {...item}
                                                currentPage={currentPage}
                                                key={item.id}
                                            />
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                    }
                </div>

            }
        </Fragment>
    )
}

const clickedShowAnime = [
    {
        '0%': {
            height: 50,
            width: 50,
            borderRadius: '50%'
        },
        '30%': {
            height: 50,
            width: 50,
            borderRadius: '0%'
        },
        '60%': {
            height: 50,
            width: 230,
            borderRadius: '0%'
        },
        '100%': {
            height: 350,
            width: 230,
            borderRadius: '0%'
        }
    }
]

const clickedHideAnime = [
    {
        '0%': {
            height: 350,
            width: 230,
            borderRadius: '0%'
        },
        '30%': {
            height: 350,
            width: 50,
            borderRadius: '0%'
        },
        '60%': {
            height: 50,
            width: 50,
            borderRadius: '0%'
        },
        '100%': {
            height: 50,
            width: 50,
            borderRadius: '50%'
        }
    }
]

const fadeIn = [
    {
        'from': {
            opacity: 0,
            fontSize: 0
        },
        'to': {
            opacity: 1,
            fontSize: 17
        }
    }
]

const styles = StyleSheet.create({
    header: {
        position: 'fixed',
        top: 40,
        right: 60,
        zIndex: 1000,
        boxShadow: '0 0 5px #888',
        '@media(max-width: 480px)': {
            top: 30,
            right: 30
        }
    },
    // ハンバーガーメニューのスタイル begin
    humbergerContainer: {
        ':nth-child(1n) > div': {
            position: 'absolute',
            zIndex: 1000,
            right: 13,
            height: 2,
            width: 25,
            backgroundColor: '#fff',
            display: 'inline-block',
        },
    },
    humbergerTop: {
        top: 15.5,
    },
    openHumbergerTop: {
        transitionDuration: '1s',
        transform: 'translateY(8px) rotateZ(90deg) rotate(45deg)',
    },
    closeHumbergerTop: {
        transitionDuration: '1s',
        transform: 'translateY(0px) rotateZ(0deg) rotate(0deg)',
    },
    humbergerMiddle: {
        top: 24,
    },
    openHumbergerMiddle: {
        transitionDuration: '1s',
        opacity: 0
    },
    closeHumbergerMiddle: {
        transitionDuration: '1s',
        transform: 'translateY(0px) rotateY(180deg) rotate(0deg)',
    },
    humbergerBottom: {
        top: 32.5,
    },
    openHumbergerBottom: {
        transitionDuration: '1s',
        transform: 'translateY(-8px) rotateZ(-90deg) rotate(-45deg)',
    },
    closeHumbergerBottom: {
        transitionDuration: '1s',
        transform: 'translateY(0px) rotateZ(0deg) rotate(0deg)',
    },
    // ハンバーガーメニューのスタイル end
    btnContainer: {
        height: 50,
        width: 50,
        borderRadius: '50%',
        backgroundColor: '#e83e53',
        cursor: 'pointer'
    },
    menuContainer: {
        height: 350,
        width: 230,
        backgroundColor: '#e83e53',
        padding: '20px 10px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
    },
    menuTitle: {
        display: 'block',
        fontSize: 17,
        color: '#fff',
        letterSpacing: '0.1em',
        textDecoration: 'none',
        margin: '25px 0',
        animationName: fadeIn,
        animationDelay: '0s',
        animationDuration: '500ms',
        animationTimingFunction: 'easy',
    },
    clickedShowAnimation: {
        animationName: clickedShowAnime,
        animationDelay: '0s',
        animationDuration: '500ms',
        animationTimingFunction: 'easy',
        animationFillMode: 'forwards'
    },
    clickedHideAnimation: {
        animationName: clickedHideAnime,
        animationDelay: '0s',
        animationDuration: '500ms',
        animationTimingFunction: 'easy',
        animationFillMode: 'forwards'
    }
})