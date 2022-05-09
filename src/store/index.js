import Vue from "vue";
import Vuex from "vuex";

import getters from './getters'
import mutations from './mutations';
import actions from './actions';

// 1. 安装插件
Vue.use(Vuex);

// 2. 创建 store 对象
const state = {
  cartList: [],
};
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
