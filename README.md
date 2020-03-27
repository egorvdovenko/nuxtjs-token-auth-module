# Nuxt.js token auth module

Token based authentication module for Nuxt.js apps.

## Setup

Install with npm:
```bash
npm install nuxt-token-auth @nuxtjs/axios
```

Edit `nuxt.config.js`:
```js
// Nuxt application should be launched in 'spa' mode
mode: 'spa',
modules: [
  // Modules connection order matters
  'nuxt-token-auth',
  '@nuxtjs/axios'
],
tokenAuth: {
  // Settings
}
```

### Important

When adding auth-module to a new Nuxt project ensure you have activated the Vuex store.

## Middleware

You can enable `tokenAuth` middleware. When this middleware is enabled on a route and `loggedIn` is `false` user will be redirected to `redirects.login` route.

Edit `nuxt.config.js`:
```js
router: {
  middleware: ['tokenAuth']
}
```

In case of global usage, You can set `tokenAuth` option to `false` in a specific component and the middleware will ignore that route.
```js
export default {
  tokenAuth: false
}
```

## Settings

Example:
```js
{
    // Each endpoint is a required option.
    // It will be used to make requests using axios.
    endpoints: {
      refresh: {
        url: 'http://localhost:3000/api/refresh',
        method: 'post'
      },
      login: {
        url: 'http://localhost:3000/api/login',
        method: 'post'
      },
      logout: {
        url: 'http://localhost:3000/api/logout',
        method: 'post'
      }
    },
    // Each redirect is a required option.
    // It will be used to make redirect, after failed loggedIn check or refresh request.
    redirects: {
      login: '/login'
    }
}
```

## Methods

Anywhere in your application you can use following methods:

### login

```js
this.$tokenAuth.login([data])
// return Promise object with axios request
// [data] - data object for axios request
```

### logout

```js
this.$tokenAuth.logout([data])
// return Promise object with axios request
// [data] - data object for axios request
```

### getToken

```js
this.$tokenAuth.getToken()
// return auth token 
```

### getRefreshToken

```js
this.$tokenAuth.getRefreshToken()
// return refresh token 
```

### setToken

```js
this.$tokenAuth.setToken(token)
// setting auth token 
```

### setToken

```js
this.$tokenAuth.setRefreshToken(refreshToken)
// setting refresh token 
```

## License

[ISC](https://opensource.org/licenses/ISC)
