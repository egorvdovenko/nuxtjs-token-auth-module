# Nuxt.js token auth module

Token based authentication module for Nuxt.js apps.

## Setup

Install with npm:
```bash
npm install nuxt-token-auth-module @nuxtjs/axios
```

Edit `nuxt.config.js`:
```js
modules: [
  // Modules connection order matters
  'nuxt-token-auth-module',
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
// return auth token in 'spa' mode

this.$tokenAuth.getToken(context)
// return auth token in 'universal' mode
```

### getRefreshToken

```js
this.$tokenAuth.getRefreshToken()
// return refresh token in 'spa' mode

this.$tokenAuth.getRefreshToken(context)
// return refresh token in 'universal' mode 
```

### setToken

```js
this.$tokenAuth.setToken(token)
// setting auth token in 'spa' mode

this.$tokenAuth.setToken(token, context)
// setting auth token in 'universal' mode
```

### setRefreshToken

```js
this.$tokenAuth.setRefreshToken(refreshToken)
// setting refresh token in 'spa' mode

this.$tokenAuth.setRefreshToken(refreshToken, context)
// setting refresh token in 'universal' mode
```

### removeToken

```js
this.$tokenAuth.removeToken()
// remove token in 'spa' mode

this.$tokenAuth.removeToken(context)
// remove token in 'universal' mode 
```

### removeRefreshToken

```js
this.$tokenAuth.removeRefreshToken()
// remove refresh token in 'spa' mode

this.$tokenAuth.removeRefreshToken(context)
// remove refresh token in 'universal' mode 
```

## Usage example

### Login

```js
<script>
export default {
  data () {
    return {
      login: 'login',
      password: 'password'
    }
  },
  methods: {
    onLoginSubmit () {
      this.$tokenAuth
        .login({
          data: {
            login: this.login,
            password: this.password
          }
        })
        .then(() => {
          this.$router.push({
            name: 'index'
          })
        })
        .catch((error) => {
          console.log('login.vue => onLoginSubmit() => error: ', error)
        })
    }
  }
}
</script>
```

After you log in, `token` will be updated automatically if any of the requests receives a `401 Unathorized` status code and `refreshToken` is not expired.
If the lifetime of both tokens has expired, then you will be redirected to the `login` route from settings `redirect` section.

### Logout

```js
<script>
export default {
  methods: {
    onLogoutSubmit () {
      this.$tokenAuth
        .logout()
        .then(() => {
          this.$router.push({
            name: 'login'
          })
        })
        .catch((error) => {
          console.log('index.vue => onLogoutSubmit() => error: ', error)
        })
    }
  }
}
</script>
```

## License

[ISC](https://opensource.org/licenses/ISC)
