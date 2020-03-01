import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import works from './works'


function createStore() {
  const middleware = [thunk];
  if(process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
  }

  const store = reduxCreateStore(
    combineReducers({
      works
    }),
    applyMiddleware(...middleware)
  );
  
  return store;
}

export default createStore()