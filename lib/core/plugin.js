import { utilities } from './utilities'

const options = JSON.parse('<%= JSON.stringify(options) %>')
const { namespace, endpoints, redirects } = options

export default function (ctx, inject) {
  const { store, redirect, app: { $axios } } = ctx

  inject(namespace, {
    login,
    logout,
    ...utilities
  })

  if (!$axios) {
    // eslint-disable-next-line no-console
    console.error('[TOKEN_AUTH] add the @nuxtjs/axios module to nuxt.config file')
    return
  }

  $axios.interceptors.request.use(
    (config) => {
      const token = utilities.getToken(ctx)

      config.headers.authorization = `Bearer ${token}`

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  $axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const { response: { status } } = error

      if (status === 401) {
        const token = utilities.getToken(ctx)
        const refreshToken = utilities.getRefreshToken(ctx)

        if (token && refreshToken) {
          return refresh(token, refreshToken)
            .then(() => {
              return $axios.request(error.config)
            })
        }

        redirect(redirects.login)
      }

      return Promise.reject(error)
    }
  )

  function refresh (token, refreshToken) {
    if (store.state[namespace].isRefreshing) {
      return store.state[namespace].refreshingCall
    }

    store.commit(`${namespace}/updateRefreshingState`, true)

    const refreshingCall = $axios({
      method: endpoints.refresh.method,
      url: endpoints.refresh.url,
      data: {
        token,
        refreshToken
      }
    })
      .then((response) => {
        const { data: { token, refreshToken } } = response

        utilities.setToken(token, ctx)
        utilities.setRefreshToken(refreshToken, ctx)

        return Promise.resolve(response)
      })
      .catch((error) => {
        redirect(redirects.login)

        return Promise.reject(error)
      })
      .finally(() => {
        store.commit(`${namespace}/updateRefreshingState`, false)
        store.commit(`${namespace}/updateRefreshingCall`, null)
      })

    store.commit(`${namespace}/updateRefreshingCall`, refreshingCall)

    return refreshingCall
  }
  function login (requestConfig) {
    return $axios({
      method: endpoints.login.method,
      url: endpoints.login.url,
      ...requestConfig
    })
      .then((response) => {
        const { data: { token, refreshToken } } = response

        store.commit(`${namespace}/updateLoggedIn`, true)

        utilities.setToken(token, ctx)
        utilities.setRefreshToken(refreshToken, ctx)

        return Promise.resolve(response)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
  function logout (requestConfig) {
    return $axios({
      method: endpoints.logout.method,
      url: endpoints.logout.url,
      ...requestConfig
    })
      .then((response) => {
        store.commit(`${namespace}/updateLoggedIn`, false)

        utilities.removeToken(ctx)
        utilities.removeRefreshToken(ctx)

        return response
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}
