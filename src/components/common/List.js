import React from 'react'

export default function List (props) {
    const {
        data,
        item
    } = props
    let list = []
    for (let i = 0; i < data.length; i++) {
        list.push(item(data[i], i))
    }
    return list
}