import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from 'Styles/index.scss'
import { UserAction } from '../redux'

const Header = ({ isLoggedIn, logout }) => {
  return (
    <header className={styles.headerWrapper}>
      <Link className={styles.logoContainer} to='/' />
      {isLoggedIn && <Link to='/' className={styles.logoutBtn} onClick={logout}>Logout</Link>}
    </header>
  )
}
const mapStateToProps = ({ userStore: { isLoggedIn } }) => ({ isLoggedIn })
const mapDispatchToProps = (dispatch) => ({ logout: () => dispatch(UserAction.logout()) })

export default connect(mapStateToProps, mapDispatchToProps)(Header)
