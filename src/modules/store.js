import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import works from './works'

function createStore() {
  const store = reduxCreateStore(
    combineReducers({
      works
    }),
    applyMiddleware(
      thunk,
      logger,
    )
  );
  
  return store;
}

export default createStore()