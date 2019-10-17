import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { TextField, FormControl, Button } from '@material-ui/core'

import { UserAction } from 'Redux'

import styles from 'Styles/index.scss'

const Login = (props) => {
  useEffect(() => { checkLoginState() })
  const { username, password, errorMsg, isLoggedIn } = props.userStore

  const checkLoginState = () => {
    if (isLoggedIn) {
      props.history.push('/dashboard')
    }
  }

  const onInputChange = ({ target: { value } }, fieldName) => {
    props.onInputChange({ [fieldName]: value })
  }

  const onLoginClick = (event) => {
    if (username.length <= 0 || password.length <= 0) {
      props.setErrorMsg('Enter valid username & password')
    } else {
      // Execute only 'Click' Events or Enter 'keyup' Event
      const { type, keyCode } = event
      if (type !== 'click' && (type === 'keyup' && keyCode !== 13)) { return }
      props.actions.login({ username, password })
    }
  }
  const onPasswordEnter = (event) => {
    if (event.keyCode === 13) { props.actions.login({ username, password }) }
  }

  return (
    <div className={styles.loginInnerWrapper}>
      <div className={styles.loginContent}>
        <form className={styles.loginForm}>
          <FormControl style={{ width: '100%' }}>
            <TextField
              name='username'
              label='Username'
              variant='outlined'
              type='text'
              placeholder='Username'
              className={styles.loginInput}
              required
              value={username}
              onChange={e => onInputChange(e, 'username')}
            />
          </FormControl>
          <FormControl style={{ width: '100%' }}>
            <TextField
              name='password'
              label='Password'
              variant='outlined'
              type='password'
              placeholder='Password'
              className={styles.loginInput}
              required
              value={password}
              onChange={e => onInputChange(e, 'password')}
              onKeyUp={onPasswordEnter}
            />
          </FormControl>
          {errorMsg.length > 0 ? <span className={styles.errorMsg}>{errorMsg}</span> : null}
        </form>
        <Button color='primary' size='large' variant='contained' className={styles.loginArrow} onKeyUp={onLoginClick} onClick={onLoginClick}> Login </Button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ userStore }) => ({ userStore })
function mapDispatchToProps (dispatch) {
  return {
    onInputChange: data => dispatch(UserAction.onInputChange(data)),
    setErrorMsg: data => dispatch(UserAction.setErrorMsg(data)),
    actions: {
      login: (form) => dispatch(UserAction.login(form))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
