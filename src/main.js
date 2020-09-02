import Vue from "vue";
import App from "./App.vue";
import axios from 'axios'

axios.defaults.timeout = 500000000;

Vue.config.productionTip = false;
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App)
}).$mount("#app");
