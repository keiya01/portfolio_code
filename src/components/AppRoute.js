import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomeTopScreen from '../containers/home/HomeTopScreen'
import WorkTopScreen from '../containers/works/WorkTopScreen'
import BlogTopScreen from '../containers/blogs/BlogTopScreen'
import ScrollToTop from '../containers/ScrollToTop';

export default function AppRoute() {
    return (
        <Router basename='/portfolio/#'>
            <ScrollToTop>
                <Switch>
                    <Route path={`/works`} component={WorkTopScreen} />
                    <Route path={`/blogs`} component={BlogTopScreen} />
                    <Route exact path={`/`} component={HomeTopScreen} />
                </Switch>
            </ScrollToTop>
        </Router>
    )
}