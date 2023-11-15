import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIndex: null,
    userLogged: '',
    users: ['Alessio', 'Mario', 'Fabio', 'Michela'],
    toDoList: [
      {
        title: 'Creare il layout responsive',
        done: true,
        user: 'Alessio',
        visible: true
      },
      {
        title: 'Gestire le chiamate API',
        done: false,
        user: 'Mario',
        visible: true
      },
      {
        title: 'Sviluppare il backend',
        done: true,
        user: 'Fabio',
        visible: true
      },
      {
        title: 'Creare un gestionale',
        done: false,
        user: 'Michela',
        visible: true
      },

    ],
    completedToDoList: [
    ],
    comic: ''
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
