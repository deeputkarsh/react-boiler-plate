import axios from 'axios'

const localStorage = window.localStorage

axios.interceptors.request.use(
  config => {
    config.headers['content-type'] = 'application/json'
    // change any global config on request
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  config => {
    if (config.status === 200) {
      // change something on response success
      return config
    }
  },
  error => {
    if (error && error.response && error.response.status === 406) {
      localStorage.clear()
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)
