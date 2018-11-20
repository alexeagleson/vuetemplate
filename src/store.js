import Vue from 'vue';
import Vuex from 'vuex';

const state = {
  courses: [],
  user: {
    id: 12645,
  },
};

const mutations = {
  CLEAR_COURSES(state) {
    state.courses = [];
  },
  ADD_COURSE(state, payload) {
    const newCourse = payload;
    state.courses.push(newCourse);
    // to change state: Vue.set(state-variable, 'key', 'value');
  },
};

const actions = {
  addCourse(context, payload) {
    context.commit('ADD_COURSE', payload);
  },
};

const getters = {
  getUser(state) {
    return state.user;
  },
};

Vue.use(Vuex);

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
});

export default store;
