let AuthUser
export const Auth = {
  register: (apiUser = {}) => {
    AuthUser = new User(apiUser)
    LocalStorageHelper.register(AuthUser)
  },

  isLoggedIn: () => {
    return !!AuthUser || !!LocalStorageHelper.getUser() || false
  },

  deregister: () => {
    LocalStorageHelper.deregister()
    AuthUser = undefined
  },

  getUser: () => {
    return AuthUser || LocalStorageHelper.getUser()
  },

  getToken: () => {
    let token = ''
    if (AuthUser) {
      token = 'Bearer ' + AuthUser.Token
    } else if (LocalStorageHelper.getUser()) {
      if (LocalStorageHelper.getUser()) {
        token = 'Bearer ' + LocalStorageHelper.getUser().Token
      }
    }
    return token
  },

  getUserName: () => {
    let userName = ''
    if (AuthUser) {
      userName = AuthUser.Username
    } else if (LocalStorageHelper.getUser()) {
      if (LocalStorageHelper.getUser()) {
        userName = LocalStorageHelper.getUser().Username
      }
    }
    return userName
  }
}

class User {
  constructor (apiObj) {
    this.id = apiObj.id
    this.Username = apiObj.username
  }
}

const { btoa, atob, localStorage } = window || {}
const LocalStorageHelper = {
  register (userObj) {
    const encodedObj = EncodeDecode.encode(JSON.stringify(userObj))
    localStorage.setItem('USER', encodedObj)
  },
  deregister () {
    localStorage.clear()
  },
  getUser () {
    let user = ''
    if (localStorage.getItem('USER')) {
      user = EncodeDecode.decode(localStorage.getItem('USER'))
      user = JSON.parse(user)
    }
    return user
  }
}

const EncodeDecode = {
  encode (data) {
    let encodedData = ''
    if (data) {
      const isObject = data => data && data.constructor && data.constructor === Object
      encodedData = isObject ? btoa(data) : ''
    }
    return encodedData
  },
  decode (data) {
    let decodedData = ''
    decodedData = data ? atob(data) : ''
    return decodedData
  }
}
