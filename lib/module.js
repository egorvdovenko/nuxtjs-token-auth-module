const { resolve, join } = require('path')
const { readdirSync } = require('fs')

const defaultOptions = {
  namespace: 'tokenAuth',
  tokenName: 'token',
  refreshTokenName: 'refresh_token'
}

module.exports = function (moduleOptions) {
  const options = {
    ...defaultOptions,
    ...moduleOptions,
    ...this.options.tokenAuth
  }

  const { namespace } = options
  const pluginsToSync = [
    'core/middleware.js',
    'core/storage.js',
    'core/plugin.js'
  ]
  const foldersToSync = [
    'core'
  ]

  for (const pathString of pluginsToSync) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join(namespace, pathString),
      options
    })
  }

  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString)

    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join(namespace, pathString, file),
        options
      })
    }
  }
}

module.exports.meta = require('../package.json')
