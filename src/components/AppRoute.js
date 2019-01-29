import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomeTopScreen from '../containers/home/HomeTopScreen'

export default class AppRoute extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <Route exact path='/' component={HomeTopScreen} />
                    <Route path='/works' component={HomeTopScreen} />
                    <Route path='/blogs' component={HomeTopScreen} />
                </Fragment>
            </Router>
        )
    }
}