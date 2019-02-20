import React, { lazy, Suspense } from 'react'
import store from '../modules/store'
import { Provider } from 'react-redux'
import LoadingScreen from './common/LoadingScreen';

const AppRoute = lazy(() => import('../containers/AppRoute'))

export default function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingScreen />}>
        <AppRoute />
      </Suspense>
    </Provider>
  )
}
