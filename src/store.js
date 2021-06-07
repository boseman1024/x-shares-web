import Vue from "vue";
import Vuex from "vuex";
import mutations from './store/mutations';
import actions from './store/actions';
import state from './store/state';
import getters from './store/getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters:getters
});
