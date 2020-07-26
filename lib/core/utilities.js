const options = JSON.parse('<%= JSON.stringify(options) %>')
const { namespace, tokenName, refreshTokenName } = options

const utilities = {
  setToken (token) {
    localStorage.setItem(`${namespace}.${tokenName}`, token)
  },
  setRefreshToken (refreshToken) {
    localStorage.setItem(`${namespace}.${refreshTokenName}`, refreshToken)
  },
  setStorageState (ctx, state) {
    const cookieValue = `${namespace}.state=${JSON.stringify(state[namespace])}; Expires=${getCookieExpires()}`

    if (process.server) {
      ctx.res.setHeader('Set-Cookie', [cookieValue])
    } else {
      document.cookie = cookieValue
    }
  },
  getToken () {
    return localStorage.getItem(`${namespace}.${tokenName}`)
  },
  getRefreshToken () {
    return localStorage.getItem(`${namespace}.${refreshTokenName}`)
  },
  getStorageState (ctx) {
    const cookie = process.server
      ? ctx.req.headers.cookie
      : document.cookie

    if (!cookie) {
      return
    }

    const cookiesPOJO = getCookiesPOJO(cookie)

    return JSON.parse(cookiesPOJO[`${namespace}.state`])
  },
  removeToken () {
    localStorage.removeItem(`${namespace}.${tokenName}`)
  },
  removeRefreshToken () {
    localStorage.removeItem(`${namespace}.${refreshTokenName}`)
  },
  checkModuleState (route) {
    return route.matched.some((m) => {
      return Object.values(m.components).some(
        component => component.options && component.options.tokenAuth === false
      )
    })
  }
}

function getCookiesPOJO (cookie) {
  const cookiesPOJO = {}

  cookie
    .split(';')
    .forEach((cookie) => {
      const parts = cookie.match(/(.*?)=(.*)$/)

      cookiesPOJO[parts[1].trim()] = (parts[2] || '').trim()
    })

  return cookiesPOJO
}

function getCookieExpires () {
  const currentDate = new Date()

  return new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate())
}

export default utilities
