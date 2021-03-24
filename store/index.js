export default {
  state: {
    locale: 'en',
    title: null,
    user: { name: null, email: null, password: null },
  },
  mutations: {
    setLocale(state, payload = 'en') {
      state.locale = payload
    },
    setUser(state, payload) {
      //   if (payload.password) payload.password = hash(payload.password)
      state.user = payload
    },
  },
  actions: {
    logout({ commit }) {
      commit('setUser', { name: null, email: null, password: null })
    },
  },
  getters: {
    loggedUser(state) {
      return state.user
    },
  },
}
