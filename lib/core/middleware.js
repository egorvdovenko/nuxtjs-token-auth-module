import Middleware from '../../middleware'
import utilities from './utilities'

const options = JSON.parse('<%= JSON.stringify(options) %>')
const { namespace, redirects } = options

Middleware.tokenAuth = function (ctx) {
  const { store, route, redirect } = ctx

  store.commit(
    `${namespace}/updateModuleState`,
    utilities.checkModuleState(route)
  )

  if (!store.state[namespace].loggedIn && !store.state[namespace].isDisabled) {
    redirect(redirects.login)
  }
}
