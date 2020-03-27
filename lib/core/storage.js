import utilities from './utilities'

const options = JSON.parse('<%= JSON.stringify(options) %>')
const { namespace } = options

const defaultState = {
  loggedIn: false,
  isRefreshing: false,
  isDisabled: false,
  refreshingCall: null
}

const storage = {
  namespaced: true,
  state () {
    return utilities.getStorageState() || defaultState
  },
  mutations: {
    updateLoggedIn (state, loggedIn) {
      state.loggedIn = loggedIn
    },
    updateState (state, isDisabled) {
      state.isDisabled = isDisabled
    },
    updateRefreshingState (state, isRefreshing) {
      state.isRefreshing = isRefreshing
    },
    updateRefreshingCall (state, refreshingCall) {
      state.refreshingCall = refreshingCall
    }
  }
}

export default function (ctx) {
  const { store } = ctx

  store.registerModule(namespace, storage, {
    preserveState: Boolean(store.state[namespace])
  })
  store.subscribe((mutation, state) => {
    if (mutation.type.includes(namespace)) {
      utilities.setStorageState(state)
    }
  })
}
