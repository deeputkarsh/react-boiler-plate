import { createActions, handleActions, combineActions } from 'redux-actions'
import { Auth } from '../utils'
import axios from 'axios'
import { USER_API } from '../api.js'
import { SnackbarAction } from './snackbarActions'

const defaultState = { username: '', password: '', errorMsg: '', isLoggedIn: Auth.isLoggedIn() }
const login = (form) => dispatch => {
  const loginAction = dispatch(fetchLogin(form))
  loginAction.then(({ payload }) => {
    dispatch(SnackbarAction.show(payload))
    dispatch(onInputChange({ username: '', password: '' }))
  }).catch(error => {
    const { response = { data: { message: 'Something went wrong' } } } = error
    dispatch(setErrorMsg(response.data.message))
  })
}
const { fetchLogin, logout, onInputChange, setErrorMsg } = createActions({
  LOGOUT: _ => { Auth.deregister(); return defaultState },
  ON_INPUT_CHANGE: (data) => ({ ...data, errorMsg: '' }),
  SET_ERROR_MSG: errorMsg => ({ errorMsg }),
  FETCH_LOGIN: async (form) => {
    const response = await axios.post(USER_API.LOGIN, { form })
    Auth.register(response.data.data.data)
    return 'Logged in successfully!!'
  }
})
export const UserAction = { login, logout, onInputChange, setErrorMsg }

export default handleActions({ [combineActions(login, logout, onInputChange, setErrorMsg)]: (state, { payload }) => ({ ...state, ...payload, isLoggedIn: Auth.isLoggedIn() }) }, defaultState)
