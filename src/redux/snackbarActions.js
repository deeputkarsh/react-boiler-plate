import { createActions, handleActions, combineActions } from 'redux-actions'

const defaultState = { open: false }
const { show, hide } = createActions({
  SHOW: (data = '') => ({ data, open: true }),
  HIDE: _ => defaultState
})

export const SnackbarAction = { show, hide }

export default handleActions({ [combineActions(show, hide)]: (state, { payload }) => payload }, defaultState)
