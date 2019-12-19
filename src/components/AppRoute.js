import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ScrollToTop from '../containers/ScrollToTop'
import LoadingScreen from '../components/common/LoadingScreen';
const HomeTopScreen = lazy(() => import('../containers/home/HomeTopScreen'))
const BlogTopScreen = lazy(() => import('../containers/blogs/BlogTopScreen'))
const WorkTopScreen = lazy(() => import('../containers/works/WorkTopScreen'))

export default function AppRoute() {
    return (
        <Router basename='/portfolio/#'>
            <ScrollToTop>
                <Switch>
                    <Suspense fallback={<LoadingScreen/>}>
                        <Route path={`/works`} component={WorkTopScreen} />
                        <Route path={`/blogs`} component={BlogTopScreen} />
                        <Route exact path={`/`} component={HomeTopScreen} />
                    </Suspense>
                </Switch>
            </ScrollToTop>
        </Router>
    )
}