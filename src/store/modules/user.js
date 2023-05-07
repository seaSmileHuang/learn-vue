
export default {
  namespaced: true,
  state: {
    token: undefined,
    name: undefined,
    roles: [],
    isAuth: false
  },
  getters: {

  },
  mutations: {
    SET_TOKEN: (state, { token }) => {
      state.token = token
    },
    SET_NAME: (state, { name }) => {
      state.name = name
    },
    SET_ROLES: (state, { roles }) => {
      state.roles = roles
    },
    SET_AUTH: (state, { isAuth }) => {
      state.isAuth = isAuth
    }
  },
  actions: {
    login ({ commit }, { userName, password }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', { token: 'hhjToken' })
        commit('SET_NAME', { name: 'hhj' })
        commit('SET_ROLES', { roles: ['admin'] })
        commit('SET_AUTH', { isAuth: true })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', { token: undefined })
        commit('SET_NAME', { name: undefined })
        commit('SET_ROLES', { roles: [] })
        commit('SET_AUTH', { isAuth: false })
      })
    },
    getUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', { token: 'hhjToken' })
        commit('SET_NAME', { name: 'hhj' })
        commit('SET_ROLES', { roles: ['dashbroad'] })
        commit('SET_AUTH', { isAuth: true })
      })
    }
  }
}
