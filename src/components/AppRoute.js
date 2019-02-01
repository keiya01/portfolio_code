import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomeTopScreen from '../containers/home/HomeTopScreen'
import WorkTopScreen from '../containers/works/WorkTopScreen'
import BlogTopScreen from '../containers/blogs/BlogTopScreen'

export default class AppRoute extends Component {
    render() {
        const Domain = 'portfolio'
        return (
            <Router
                basename={process.env.PUBLIC_URL}
            >
                <Fragment>
                    <Route path={`/${Domain}/works`} component={WorkTopScreen} />
                    <Route path={`/${Domain}/blogs`} component={BlogTopScreen} />
                    <Route exact path={`/${Domain}`} component={HomeTopScreen} />
                </Fragment>
            </Router>
        )
    }
}