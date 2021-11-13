import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
import {
  setStorage,
  getStorage,
  clearStorage,
  updataStorage,
} from "./util/tools";

Vue.prototype.$tl = {
  set: setStorage,
  get: getStorage,
  clear: clearStorage,
  updata: updataStorage,
};
Vue.config.productionTip = false;
Vue.use(Vant);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
