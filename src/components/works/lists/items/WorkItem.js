import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IconListItem = (props) => {
    const {
        icon,
        line,
        iconColor
    } = props
    const iconName = icon ? icon : 'circle'
    const size = !icon && 10
    const textIndent = icon ? '-1.3em' : '-0.9em'
    return (
        <li className={css(styles.contentListItem)} style={{ textIndent }}>
            <FontAwesomeIcon
                icon={iconName}
                style={{ color: iconColor, fontSize: size, marginRight: 5 }}
            />
            {line}
        </li>
    )
}

export default class WorkItem extends Component {
    nl2br = (str, icon, iconColor) => {
        const regex = /(\n)/g
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
    render() {
        const {
            title,
            technology,
            body,
            favorite,
            improvement,
            color,
            image,
            link,
            created_at,
            onShowItem
        } = this.props
        return (
            <div
                className={css(styles.item)}
                onClick={() => onShowItem(this.animation, this.filter, this.props)}
                style={{ height: 400, overflowY: 'hidden' }}
                ref={(e) => this.animation = e}
            >
                {
                    image
                        ?
                        <img src={image} alt="thumnail" loading="lazy" className={css(styles.image)} />
                        :
                        <div className={css(styles.noImage)} >
                            <h3 className={css(styles.noImageText)}>No Image</h3>
                        </div>
                }
                <div className={css(styles.contentContainer)}>
                    <h3 className={css(styles.contentTitle)} style={{ color }}>{title}</h3>
                    <p className={css(styles.createdAt)}>作成日: {created_at}</p>
                    <div style={{ clear: 'left' }} />
                    <p className={css(styles.technologyContainer)}><span style={{ color }}>技術</span>: {technology}</p>
                    <ul className={css(styles.contentList)}>
                        {this.nl2br(body, 'check', color)}
                    </ul>
                    <p className={css(styles.subTitle)} style={{ color: '#FA776D' }}>
                        <FontAwesomeIcon
                            icon='grin-squint'
                            style={{ marginRight: 5 }}
                        />
                        お気に入りポイント
                    </p>
                    <ul className={css(styles.contentList)}>
                        {this.nl2br(favorite)}
                    </ul>
                    <p className={css(styles.subTitle)} style={{ color: '#F9CDAD' }}>
                        <FontAwesomeIcon
                            icon='frown'
                            style={{ marginRight: 5 }}
                        />
                        反省点
                    </p>
                    <ul className={css(styles.contentList)}>
                        {this.nl2br(improvement)}
                    </ul>
                    <div className={css(styles.codeBtn)}>
                        <a className={css(styles.codeLink)} href={link}>
                            <FontAwesomeIcon
                                icon={['fab', 'github']}
                                style={{ fontSize: 20, marginRight: 5 }}
                            />
                            Githubを見る
                        </a>
                    </div>
                </div>
                <div className={css(styles.filter)} ref={(e) => this.filter = e}>
                    <h3 className={css(styles.filterText)}>もっと見る</h3>
                </div>
            </div>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        position: 'relative',
        width: '90%',
        maxWidth: 480,
        borderRadius: 20,
        boxShadow: '2px 2px 10px #ddd, -2px -2px 10px #ddd',
        margin: '0 auto',
        backgroundColor: '#fff',
        cursor: 'pointer'
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        objectFit: 'contain',
        padding: '3px 0',
        borderBottom: 'solid 1.5px #ccc'
    },
    noImage: {
        display: 'flex',
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottom: 'solid 1.5px #ccc'
    },
    noImageText: {
        fontSize: 25,
        color: '#ccc',
    },
    contentContainer: {
        height: '100%',
        padding: '20px',
    },
    contentTitle: {
        float: 'left',
        fontSize: 30,
        marginBottom: 10,
    },
    createdAt: {
        float: 'right',
        fontSize: 13,
        color: '#777',
    },
    technologyContainer: {
        fontSize: 14,
        color: '#757575',
        textIndent: '-2.5em',
        wordWrap: 'break-word',
        paddingLeft: 35,
        marginTop: 25,
        marginBottom: 25
    },
    contentList: {
        listStyle: 'none',
        padding: 0,
        paddingLeft: 20,
        marginTop: 10,
        wordWrap: 'break-word',
    },
    contentListItem: {
        fontSize: 16,
        color: '#555',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 35,
    },
    codeBtn: {
        textAlign: 'center',
        marginTop: 50,
    },
    codeLink: {
        fontSize: 16,
        color: '#757575',
        textDecoration: 'underline solid #757575',
    },
    filter: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        height: 65,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    filterText: {
        color: '#FA776D',
        fontSize: 17,
        textAlign: 'center',
        marginTop: 20
    }
})