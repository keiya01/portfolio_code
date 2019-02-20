import React from 'react'
import { StyleSheet, css } from 'aphrodite'

export default function LoadingItem() {
    return (
        <div className={css(styles.itemBackground)}>
            <div className={css(styles.item)} >
                <div className={css(styles.imageWrapper)} />
                <div className={css(styles.contentContainer)}>
                    {/* <div className={css(styles.loadingLine)} /> */}
                    <div className={css(styles.contentTitle)} />
                    <div className={css(styles.createdAt)} />
                    <div style={{ clear: 'left' }} />
                    <div className={css(styles.technologyContainer)} />
                    <div className={css(styles.technologyContainer)} />
                    <div className={css(styles.technologyContainer)} />
                    <div className={css(styles.technologyContainer)} />
                </div>
            </div>
        </div>
    )
}

const loadingAnim = [
    {
        'from': {
            left: 0
        },
        'to': {
            left: '98%'
        }
    }
]

const styles = StyleSheet.create({
    item: {
        position: 'relative',
        width: '90%',
        maxWidth: 480,
        height: 400,
        borderRadius: 20,
        boxShadow: '2px 2px 10px #ddd, -2px -2px 10px #ddd',
        margin: '0 auto',
        backgroundColor: '#fff'
    },
    imageWrapper: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottom: 'solid 1.5px #ddd'
    },
    contentContainer: {
        position: 'relative',
        height: 200,
        padding: 20,
    },
    loadingLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 3,
        backgroundColor: '#fff',
        animationName: loadingAnim,
        animationDuration: '1s',
        animationDelay: '0s',
        animationIterationCount: "infinite",
        animationTimingFunction: 'ense-in-out',
    },
    contentTitle: {
        float: 'left',
        width: '50%',
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ddd',
        marginBottom: 10,
    },
    createdAt: {
        float: 'right',
        width: '20%',
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#ddd'
    },
    technologyContainer: {
        width: '90%',
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#ddd',
        paddingLeft: 35,
        margin: '0 auto',
        marginTop: 25,
        marginBottom: 25
    },
    itemBackground: {
        width: '100%',
        paddingBottom: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
})