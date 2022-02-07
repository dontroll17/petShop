import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import routes from "./routes";
import store from "./store";

import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
});

const vueStore = new Vuex.Store(store);

new Vue({
  render: h => h(App),
  router,
  store: vueStore
}).$mount('#app');
