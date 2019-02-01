import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomeTopScreen from '../containers/home/HomeTopScreen'
import WorkTopScreen from '../containers/works/WorkTopScreen'
import BlogTopScreen from '../containers/blogs/BlogTopScreen'

export default class AppRoute extends Component {
    render() {
        return (
            <Router basename='/portfolio/#'>
                <Fragment>
                    <Switch>
                        <Route path={`/works`} component={WorkTopScreen} />
                        <Route path={`/blogs`} component={BlogTopScreen} />
                        <Route exact path={`/`} component={HomeTopScreen} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}