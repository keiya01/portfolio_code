import React, { Component, Fragment } from 'react'
import { css, StyleSheet } from 'aphrodite'
import store from '../modules/store'
import { Provider } from 'react-redux'

import AppRoute from '../containers/AppRoute'


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRoute />
      </Provider>
    );
  }
}
