import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ScrollToTop from '../containers/ScrollToTop'
import LoadingScreen from '../components/common/LoadingScreen';
import HomeTopScreen from '../containers/home/HomeTopScreen';
import BlogTopScreen from '../containers/blogs/BlogTopScreen';
import WorkTopScreen from '../containers/works/WorkTopScreen';

export default function AppRoute() {
    return (
        <Router basename='/portfolio/#'>
            <ScrollToTop>
                <Suspense fallback={<LoadingScreen/>}>
                    <Switch>
                        <Route path={`/works`} component={WorkTopScreen} />
                        <Route path={`/blogs`} component={BlogTopScreen} />
                        <Route exact path={`/`} component={HomeTopScreen} />
                    </Switch>
                </Suspense>
            </ScrollToTop>
        </Router>
    )
}