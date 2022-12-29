import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css"
import Vuelidate from 'vuelidate'
import VueCookies from 'vue-cookies'
Vue.use(Vuelidate)
Vue.config.productionTip = false;
Vue.use(VueCookies, { 
  expire: '1d'
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
import "bootstrap/dist/js/bootstrap.js"