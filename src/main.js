import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "./assets/css/common.less";
import Unicon from "vue-unicons/dist/vue-unicons-vue2.umd";
import {
  uniHeart,
  uniEllipsisH,
  uniCamera,
  uniSmileSquintWinkAlt,
  uniSun,
  uniTagAlt,
  uniTrashAlt,
  uniEye,
  uniTimes,
  uniGoogleHangoutsAlt
} from "vue-unicons/dist/icons";

Unicon.add([
  uniHeart,
  uniEllipsisH,
  uniCamera,
  uniSmileSquintWinkAlt,
  uniSun,
  uniTagAlt,
  uniTrashAlt,
  uniEye,
  uniTimes,
  uniGoogleHangoutsAlt
]);
Vue.use(Unicon);

axios.defaults.baseURL = "/api/v1";
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("_token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  response => {
    if (response.data.Code) {
      switch (response.data.Code) {
        case 1000:
        case 1001:
          store.dispatch("logout");
          router.replace("/login");
      }
    }
    return response;
  },
  err => {
    return Promise.reject(err);
  }
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
