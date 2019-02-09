import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IconListItem = (props) => {
    const {
        icon,
        line,
        iconColor
    } = props
    return (
        <li className={css(styles.descriptionItem)}>
            <FontAwesomeIcon
                icon={icon}
                style={{ color: iconColor, marginRight: 5 }}
            />
            {line}
        </li>
    )
}

const nl2br = (str, icon, iconColor) => {
    const regex = /(\\n)/g
    return str.split(regex).map((line, i) => {
        return line.match(regex)
            ?
            <br key={i} />
            :
            <IconListItem
                line={line}
                icon={icon}
                iconColor={iconColor}
                key={i}
            />
    })
}

export default function BlogItem(props) {
    const {
        title,
        children,
        color,
        uri,
        icon,
        iconColor
    } = props
    console.log(children)
    return (
        <div className={css(styles.blogItem)}>
            <div className={css(styles.descriptionContainer)}>
                <h3 className={css(styles.headerTitle)} style={{color}}>{title}</h3>
                <ul className={css(styles.description)}>
                    {nl2br(children, icon, iconColor)}
                </ul>
                <p className={css(styles.uriText)} style={{color}}>
                    URI <a className={css(styles.uri)} href={uri}>{uri}</a>
                </p>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    blogItem: {
        backgroundColor: '#fff',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 3px 10px #aaa'
    },
    headerTitle: {
        paddingBottom: 30,
        fontSize: 80,
        '@media(max-width: 450px)': {
            paddingBottom: 10,
            fontSize: 60
        }
    },
    descriptionContainer: {
        width: '90%',
        maxWidth: 600,
    },
    description: {
        padding: 0,
        paddingLeft: 30,
        fontSize: 16,
        color: '#555',
        letterSpacing: '0.05em',
        listStyle: 'none',
    },
    descriptionItem: {
        textIndent: '-1.8em',
    },
    uriText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 30
    },
    uri: {
        color: '#3399FF',
        paddingLeft: 5,
        fontWeight: 'normal'
    }
})