const options = JSON.parse('<%= JSON.stringify(options) %>')
const { namespace, tokenName, refreshTokenName } = options

const utilities = {
  setToken (token) {
    localStorage.setItem(`${namespace}.${tokenName}`, token)
  },
  setRefreshToken (refreshToken) {
    localStorage.setItem(`${namespace}.${refreshTokenName}`, refreshToken)
  },
  setStorageState (state) {
    localStorage.setItem(`${namespace}.state`, JSON.stringify(state[namespace]))
  },
  getToken () {
    return localStorage.getItem(`${namespace}.${tokenName}`)
  },
  getRefreshToken () {
    return localStorage.getItem(`${namespace}.${refreshTokenName}`)
  },
  getStorageState () {
    return JSON.parse(localStorage.getItem(`${namespace}.state`))
  },
  removeToken () {
    localStorage.removeItem(`${namespace}.${tokenName}`)
  },
  removeRefreshToken () {
    localStorage.removeItem(`${namespace}.${refreshTokenName}`)
  },
  checkPluginState (route) {
    return route.matched.some((m) => {
      return Object.values(m.components).some(
        component => component.options && component.options.tokenAuth === false
      )
    })
  }
}

export default utilities
