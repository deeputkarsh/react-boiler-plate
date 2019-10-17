import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { Snackbar } from '@material-ui/core'

import { SnackbarAction } from 'Redux'
import Header from '../components/Header'
import Routes from './routes'

import styles from 'Styles/index.scss'

const App = (props) => {
  const renderRoutes = () => {
    return Routes.map((route, i) => (
      <Route
        exact={route.exact}
        key={i}
        path={route.path}
        component={route.component}
      />
    ))
  }
  return (
    <BrowserRouter>
      <Header />
      <div className={styles.mainWrapper}>
        <Switch>{renderRoutes()}</Switch>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={props.snackbarStatus}
          key='topBottom'
          autoHideDuration={2000}
          onClose={props.handleSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>{props.snackbarText}</span>}
        />
      </div>
    </BrowserRouter>
  )
}

function mapStateToProps ({ snackbarStore }) {
  return {
    snackbarStatus: snackbarStore.open || false,
    snackbarText: snackbarStore.data || ''
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleSnackbarClose: () => dispatch(SnackbarAction.hide())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
