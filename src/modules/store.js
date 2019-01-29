import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import window from './window'

function createStore() {
  const store = reduxCreateStore(
    combineReducers({
      window
    }),
    applyMiddleware(
      thunk,
      logger,
    )
  );
  
  return store;
}

export default createStore()