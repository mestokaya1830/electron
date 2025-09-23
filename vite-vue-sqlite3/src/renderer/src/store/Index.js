import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default createStore({
  state: {
    auth: ''
  },
  mutations: {
    setAuth(state, payload) {
      state.auth = payload
    }
  },
  actions: {},
  getters: {},
  modules: {},
  plugins: [vuexLocalStorage.plugin]
})
