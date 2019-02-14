import React, { Fragment } from 'react'
import { StyleSheet, css } from 'aphrodite'
import PreparationScreen from '../common/screen/PreparationScreen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import WorkItem from './lists/items/WorkItem'
import NextScreenButton from '../common/buttons/NextScreenButton'
import List from '../common/List'
import LoadingItem from '../common/LoadingItem'
import { setWindowHeight } from '../../util/responsive';

export default function WorkTopScreen(props) {
    const {
        list,
        onShowItem,
        isFetching,
        setRef,
        getRefs
    } = props

    const height = setWindowHeight()

    return (
        <div className={css(styles.container)} style={{height}}>
            <div className={css(styles.titleContainer)} style={{height}}>
                <h1 className={css(styles.title)}>Works</h1>
                <FontAwesomeIcon
                    icon='hand-point-down'
                    className={css(styles.handDown)}
                />
            </div>
            <div 
            className={css(styles.listContainer)}
            ref={setRef('overflowScroll')}
            >
                <div className={css(styles.tempBackground)} style={{height}} />
                {
                    isFetching
                        ?
                        <div className={css(styles.list)}>
                            <LoadingItem />
                            <LoadingItem />
                            <LoadingItem />
                        </div>
                        :
                        <div className={css(styles.list)}>
                            <List
                                data={list}
                                item={(item, index) => {
                                    return (
                                        <div
                                            className={css(styles.itemBackground)}
                                            key={index}
                                        >
                                            <WorkItem
                                                onShowItem={onShowItem}
                                                key={index}
                                                {...item}
                                                getRefs={getRefs}
                                            />
                                        </div>
                                    )
                                }}
                            />
                            <div className={css(styles.btnContainer)}>
                                <NextScreenButton
                                    uri='/blogs'
                                    text='ブログを見る →'
                                />
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

const movingTextSpace = [
    {
        'from': {
            letterSpacing: '20em'
        },
        'to': {
            letterSpacing: '0.4em'
        }
    }
]

const movingHandDown = [
    {
        'from': {
            opacity: 1,
            transform: 'translateY(0)'
        },
        'to': {
            opacity: 1,
            transform: 'translateY(-70px)'
        }

    }
]

const styles = StyleSheet.create({
    container: {
        width: '100vw',
        backgroundColor: '#fff',
        overflowY: 'scroll'
        // paddingTop: 80,
        // paddingBottom: 30
    },
    titleContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '100vw',
    },
    title: {
        fontSize: 80,
        marginTop: -80,
        color: '#e83e53',
        textAlign: 'center',
        animationName: movingTextSpace,
        animationTimingFunction: 'ease-in-out',
        animationDuration: '2s',
        animationDelay: '0s',
        animationFillMode: 'forwards',
        paddingLeft: 15,
        '@media(max-width: 375px)': {
            paddingLeft: 5,
            fontSize: 60,
            animationDuration: '1s'
        }
    },
    handDown: {
        opacity: 0,
        position: 'absolute',
        bottom: 100,
        left: '48%',
        fontSize: 40,
        color: '#FF9933',
        animationName: movingHandDown,
        animationTimingFunction: 'linear',
        animationDuration: '800ms',
        animationDelay: '2.5s',
        animationIterationCount: 6,
        animationDirection: 'alternate-reverse',
        '@media(max-width: 375px)': {
            fontSize: 27,
        }
    },
    listContainer: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: '5%',
        overflowY: 'scroll',
    },
    tempBackground: {
        width: '100vw',
    },
    list: {
        width: '100%',
        height: '100%',
        padding: '100px 0',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        boxShadow: '0 -2px 5px #ddd'
    },
    btnContainer: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        paddingBottom: 30
    },
    itemBackground: {
        width: '100%',
        paddingBottom: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
    // title: {
    //     textAlign: 'center',
    //     color: '#e83e53',
    //     fontSize: 30,
    //     marginBottom: 50,
    // },
})
