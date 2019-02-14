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

export default function HeaderButton(props) {

    const {
        currentPage,
        isClicked,
        isStart,
        isEnd,
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
    const endAnimation = isEnd && 'clickedHideAnimation'
    const headerContainer = isClicked ? 'menuContainer' : 'btnContainer'

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
            borderRadius: '50%'
        },
        '50%': {
            borderRadius: '0%',
            height: 50,
            width: 50,
        },
        '100%': {
            borderRadius: '0%',
            height: 350,
            width: 230,
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
    btnContainer: {
        height: 50,
        width: 50,
        borderRadius: '50%',
        backgroundColor: '#e83e53',
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