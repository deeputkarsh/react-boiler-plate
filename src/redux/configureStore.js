import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

import userStore from './userActions'
import snackbarStore from './snackbarActions'

const rootReducer = combineReducers({
  userStore,
  snackbarStore
})

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  thunk,
  createLogger()
)(createStore)

export function configureStore (initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  return store
}
