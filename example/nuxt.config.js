import bodyParser from 'body-parser'

const { resolve } = require('path')

module.exports = {
  mode: 'universal',
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  serverMiddleware: [
    bodyParser.json(),
    { path: '/api/invalid', handler: './api/invalid.controller.js' },
    { path: '/api/refresh', handler: './api/refresh.controller.js' },
    { path: '/api/login', handler: './api/login.controller.js' },
    { path: '/api/logout', handler: './api/logout.controller.js' }
  ],
  router: {
    middleware: ['tokenAuth']
  },
  modules: [
    '@@',
    '@nuxtjs/axios'
  ],
  tokenAuth: {
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
    redirects: {
      login: '/login'
    }
  }
}
