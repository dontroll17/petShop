import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from "./routes";

import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
