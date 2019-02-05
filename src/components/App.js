import React from 'react'
import store from '../modules/store'
import { Provider } from 'react-redux'

import AppRoute from '../containers/AppRoute'


export default function App() {
  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  )
}
