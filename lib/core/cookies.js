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
  setCookie (ctx, cookie) {
    if (process.server) {
      ctx.res.setHeader('Set-Cookie', [`${cookie}; Expires=${_getCookieExpires()}; Path=/`])
    } else {
      document.cookie = `${cookie}; Expires=${_getCookieExpires()}; Path=/`
    }
  },
  removeCookie (ctx, name) {
    if (process.server) {
      ctx.res.setHeader('Set-Cookie', [`${name}=${null}; Expires=${new Date(-1)}; Path=/`])
    } else {
      document.cookie = `${name}=${null}; Expires=${new Date(-1)}; Path=/`
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
  const currentDate = new Date()
  const year = currentDate.getFullYear() + 1
  const month = currentDate.getMonth()
  const day = currentDate.getDate()

  return new Date(year, month, day)
}
