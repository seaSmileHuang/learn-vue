export default {
  namespaced: true,
  state: {
    name: 'hhj'
  },
  getters: {
    getName (state) {
      return state.name
    }
  },
  mutations: {
    setNum (state, name) {
      state.name = name
    }
  },
  actions: {
    increment ({ rootState, commit }, { name }) {
      commit('setNum', name)
      console.log('rootState', rootState, name)
      return name
    }
  }
}
