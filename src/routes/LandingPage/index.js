import React, { useEffect } from 'react'
import { Auth } from 'Utils'
import tabs from './tabs'

import styles from 'Styles/index.scss'
import { Grid, Paper } from '@material-ui/core'

const LandingPage = (props) => {
  useEffect(() => { checkLoginState() }, [])

  const checkLoginState = () => {
    if (!Auth.isLoggedIn()) {
      props.history.push('/')
    }
  }
  const goToPath = (path) => {
    props.history.push(path)
  }

  if (!Auth.isLoggedIn()) {
    return null
  }

  return (
    <Grid container justify='center' className={styles.landingPageWrapper} spacing={3}>
      {tabs.map(item => renderTab(item, goToPath))}
    </Grid>
  )
}

const renderTab = ({ name, path, key }, goToPath) => {
  return (
    <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
      <Paper className={styles.landingPageItem} onClick={_ => goToPath(path)}>
        {name}
      </Paper>
    </Grid>
  )
}

export default LandingPage
