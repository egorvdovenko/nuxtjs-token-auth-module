import { cookies } from './cookies'

const options = JSON.parse('<%= JSON.stringify(options) %>')
const { namespace, tokenName, refreshTokenName } = options

export const utilities = {
  setToken (token, ctx) {
    cookies.setCookie(ctx, `${namespace}.${tokenName}`, token)
  },
  setRefreshToken (refreshToken, ctx) {
    cookies.setCookie(ctx, `${namespace}.${refreshTokenName}`, refreshToken)
  },
  getToken (ctx) {
    return cookies.getCookie(ctx, `${namespace}.${tokenName}`)
  },
  getRefreshToken (ctx) {
    return cookies.getCookie(ctx, `${namespace}.${refreshTokenName}`)
  },
  removeToken (ctx) {
    cookies.removeCookie(ctx, `${namespace}.${tokenName}`)
  },
  removeRefreshToken (ctx) {
    cookies.removeCookie(ctx, `${namespace}.${refreshTokenName}`)
  }
}

export const _utilities = {
  setStorageState (ctx, state) {
    cookies.setCookie(ctx, `${namespace}.state`, JSON.stringify(state[namespace]))
  },
  getStorageState (ctx) {
    const state = cookies.getCookie(ctx, `${namespace}.state`)

    if (state) {
      return JSON.parse(state)
    }
  },
  checkModuleState (route) {
    return route.matched.some((m) => {
      return Object.values(m.components).some(
        component => component.options && component.options.tokenAuth === false
      )
    })
  }
}
