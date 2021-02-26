const options = JSON.parse('<%= JSON.stringify(options) %>')
const { cookie = {} } = options

export const cookies = {
  getCookie (ctx, name) {
    const cookies = process.server
      ? ctx.req.headers.cookie
      : document.cookie

    if (!cookies) {
      return
    }

    return _getCookiesPOJO(cookies)[name]
  },
  setCookie (ctx, name, value) {
    let settings = `Expires=${_getCookieExpires()}; Path=${cookie.path || '/'}; `

    if (cookie.domain) {
      settings += `Domain=${cookie.domain}`
    }

    if (process.server) {
      ctx.res.setHeader('Set-Cookie', [`${name}=${value}; ${settings}`])
    } else {
      document.cookie = `${name}=${value}; ${settings}`
    }
  },
  removeCookie (ctx, name) {
    let settings = `Expires=${new Date(-1)}; Path=${cookie.path || '/'}; `

    if (cookie.domain) {
      settings += `Domain=${cookie.domain}`
    }

    if (process.server) {
      ctx.res.setHeader('Set-Cookie', [`${name}=${null}; ${settings}`])
    } else {
      document.cookie = `${name}=${null}; ${settings}`
    }
  }
}

function _getCookiesPOJO (cookies) {
  const cookiesPOJO = {}

  cookies
    .split(';')
    .forEach((cookie) => {
      const parts = cookie.match(/(.*?)=(.*)$/)

      cookiesPOJO[parts[1].trim()] = (parts[2] || '').trim()
    })

  return cookiesPOJO
}

function _getCookieExpires () {
  const date = new Date()

  return new Date(
    date.getFullYear() + 1,
    date.getMonth(),
    date.getDate()
  )
}
