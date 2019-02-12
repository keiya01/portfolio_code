import React, { Component, Fragment } from 'react'
import { StyleSheet, css } from 'aphrodite'
import PreparationScreen from '../common/screen/PreparationScreen';
import BlogItem from './list/item/BlogItem';
import NextScreenButton from '../common/buttons/NextScreenButton';

export default function BlogTopScreen(props) {
    const {
        setContainer,
        setRef
    } = props

    const fixedContainer = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    return (
        <div
            className={css(styles.container)}
            ref={setRef('container')}>
            <div
                ref={setContainer(1)}
                style={{ zIndex: 4, ...fixedContainer }}>
                <div className={css(styles.titleContainer)}>
                    <h1 className={css(styles.title)}>Blog</h1>
                </div>
            </div>
            <div
                ref={setContainer(2)}
                style={{ zIndex: 3, ...fixedContainer }}>
                <BlogItem
                    title='Qiita'
                    color='#55c500'
                    uri='https://qiita.com/keiya01'
                    icon='laptop-code'
                    iconColor='#e83e53'
                >
                    Qiitaでは日々の開発で発見した課題への解決方法や自分の考えをまとめたものを掲載しています。\n
                    メモというよりも外部への情報発信を意識しており、出来るだけクオリティーを高くし、
                    多くの人が理解できるような内容で書くことを心がけています。\n
                    自分のためというよりも他者のために書くという感覚であるため、曖昧な部分や間違っている部分がないかを確認しながら書いています。そうすることで自分の理解がより深いものになったり、新たな発見があったりするのでQiitaはより多くのアウトプットのためのツールとしても積極的に活用しています。
                </BlogItem>
            </div>
            <div
                ref={setContainer(3)}
                style={{ zIndex: 2, ...fixedContainer }}>
                <BlogItem
                    title='Scrapbox'
                    color='#39ac86'
                    uri='https://scrapbox.io/CodingNote'
                    icon='laptop-code'
                    iconColor='#e83e53'>
                    Scrapboxは開発の中で気づいた点を簡単にメモしています。\n
                    具体的には、記事を読んでいて参考になったコーディングの手法や、デザインパターンなどに対する自分なりの解釈、自分がコードを書いていて難しいと感じたことをメモとして残しています。
                </BlogItem>
            </div>
            <div
                ref={setContainer(4)}
                style={{ ...fixedContainer }}>
                <div
                    className={css(styles.nextBtnContainer)}>
                    <div className={css(styles.appreciationContainer)}>
                        <h3 className={css(styles.appreciationText)}>Thank you :)</h3>
                    </div>
                    <NextScreenButton
                        text='作品を見る →'
                        uri='/works' />
                </div>
            </div>
        </div>
    )
}

const fadeInBackground = [
    {
        'from': {
            backgroundColor: '#fff'
        },
        'to': {
            backgroundColor: '#e83e53',
        }
    }
]

const styles = StyleSheet.create({
    container: {
        zIndex: -100,
        backgroundColor: '#fff',
    },
    tempContainer: {
        width: '100vw',
        height: '100vh'
    },
    titleContainer: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animationName: fadeInBackground,
        animationTimingFunction: 'ease',
        animationDuration: '5s',
        animationDelay: '0s',
        animationFillMode: 'forwards',
        boxShadow: '0 3px 5px #555'
    },
    title: {
        fontSize: 80,
        marginTop: -80,
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 15,
        letterSpacing: '0.5em',
        '@media(max-width: 450px)': {
            paddingLeft: 5,
            fontSize: 60,
        }
    },
    blogContainer: {
        width: '100%',
        height: '100%',
    },
    nextBtnContainer: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    appreciationContainer: {
        textAlign: 'center'
    },
    appreciationText: {
        fontSize: 30,
        color: '#e83e53',
        paddingBottom: 100
    }
})