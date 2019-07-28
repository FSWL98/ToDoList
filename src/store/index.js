import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    TODOS: state => {
      return state.todos
    },
    DONE_TODOS: state => {
      return state.todos.filter(todo => todo.done)
    },
    UNDONE_TODOS: state => {
      return  state.todos.filter(todo => todo.done === false)
    }
  },
  mutations: {
    ADD_TODO: (state, payload) => {
      state.todos.push(payload)
    },
    DELETE_TODO: (state, payload) => {
      state.todos.splice(payload, 1)
    }
  },
  actions: {
    addToDo({commit}, todo) {
      commit('ADD_TODO', todo)
    },
    deleteToDo({commit}, todo) {
      commit('DELETE_TODO', todo)
    }
  },
});
