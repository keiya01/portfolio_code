import React, { Fragment } from 'react'
import { StyleSheet, css } from 'aphrodite'
import PreparationScreen from '../common/screen/PreparationScreen'
import WorkItem from './lists/items/WorkItem'
import NextScreenButton from '../common/buttons/NextScreenButton'
import List from '../common/List'
import Loading from '../common/Loading'

export default function WorkTopScreen (props) {
    const {
        list,
        onShowItem,
        isFetching
    } = props
    return (
        <Fragment>
            {
                isFetching
                    ?
                    <Loading />
                    :
                    <div className={css(styles.container)}>
                        <h1 className={css(styles.title)}>Works</h1>
                        <div className={css(styles.list)}>
                            <List
                                data={list}
                                item={(item, index) => {
                                    return (
                                        <WorkItem
                                            onShowItem={onShowItem}
                                            key={index}
                                            {...item}
                                        />
                                    )
                                }}
                            />
                        </div>
                    </div>
            }
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        paddingTop: 80,
        paddingBottom: 30
    },
    title: {
        textAlign: 'center',
        color: '#FA776D',
        fontSize: 30,
        marginBottom: 50,
    },
    list: {
        width: '90%',
        height: '100%',
        padding: '20px 0',
        maxWidth: 480,
        margin: '0 auto',
    },
})