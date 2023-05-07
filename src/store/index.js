import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import app from './modules/app'
import user from './modules/user'
Vue.use(Vuex)

const myPlugin = (store) => {
  store.subscribe((mutation, state) => {
    console.log('hhhmutation调用了')
  })
}

const getStorageType = function () {
  if (window.sessionStorage) {
    return {
      storage: window.sessionStorage,
      paths: ['user']
    }
  } else {
    return {
      getState: (key) => window.Cookies.getJSON(key),
      setState: (key, stat) => window.Cookies.set(key, stat),
      paths: ['user']
    }
  }
}

export default new Vuex.Store({

  state: {
  },
  getters: {
    roles: (state) => state.user.roles,
    token: (state) => state.user.token,
    isAuth: (state) => state.user.isAuth
  },
  mutations: {
  },
  actions: {
    getName () {
      console.log('调用成功了')
    }
  },
  modules: {
    app,
    user
  },
  plugins: [myPlugin, createPersistedstate({
    key: 'pc-store',
    ...getStorageType()

  })]
})
