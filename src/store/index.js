import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types';
import * as localDb from '../helpers/LocalStorage';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
  },
  mutations: {
    [types.MUTATE_NOTES]: (state, payload) => {
      state.notes = payload;
    }
  },
  actions: {
    [types.UPDATE_NOTES]: ({commit}, payload) => {
      localDb.saveNotes(payload)
      .then(res => {commit(types.MUTATE_NOTES, payload)})
      .catch(rej => {console.log(rej)})
    },
    [types.PULL_NOTES]: ({commit}) => {
      localDb.pullNotes()
      .then(res => {commit(types.MUTATE_NOTES, res)})
      .catch(rej => {console.log(rej)})
    }
  },
  getters:{
    [types.NOTES]: state => {
      return state.notes;
    },
    [types.GET_NOTE_BY_ID]: state => id => {
      return state.notes.find(note => note.id === id);
    },
  },
  modules: {
  }
})