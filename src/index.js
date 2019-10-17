import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Provider } from 'react-redux'

import { configureStore } from './redux'
import './styles/index.scss'
import App from './routes'
import './interceptor'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#0b66af' },
    secondary: { main: '#686868' }
  }
})
const reduxState = {}
const store = configureStore(reduxState)
const renderDom = (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(renderDom, document.getElementById('root'))
