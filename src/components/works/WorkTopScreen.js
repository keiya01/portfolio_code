import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import WorkItem from './lists/items/WorkItem'
import NextScreenButton from '../common/buttons/NextScreenButton'
import List from '../common/List'
import LoadingItem from '../common/LoadingItem'
import { setWindowHeight } from '../../util/responsive';
import HeaderButton from '../../containers/common/buttons/HeaderButton';
import FingerDown from '../common/icon/FingerDown';

export default function WorkTopScreen(props) {
    const {
        list,
        onShowItem,
        isFetching,
        setRef,
        getRef,
        isHeaderHide
    } = props

    const height = setWindowHeight()

    return (
        <div className={css(styles.container)} style={{ height }}>
            <HeaderButton
                currentPage='works'
                isHide={isHeaderHide}
            />
            <div
                className={css(styles.titleContainer)}
                style={{ height }}>
                <h1 className={css(styles.title)}>Works</h1>
                <FingerDown position={{bottom: 100, left: '48%'}} delay={800}/>
            </div>
            <div
                className={css(styles.listContainer)}
                ref={(e) => {
                    setRef('overflowScroll')(e)
                    setRef('scrollContainer')(e)
                }}
            >
                <div
                    className={css(styles.tempBackground)}
                    style={{ height }}
                    ref={setRef('container')}/>
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
                                                getRef={getRef}
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
        animationDuration: '500ms',
        animationDelay: '0s',
        animationFillMode: 'forwards',
        paddingLeft: 15,
        '@media(max-width: 375px)': {
            paddingLeft: 5,
            fontSize: 60,
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
