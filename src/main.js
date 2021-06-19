import Vue from "vue";
import app from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import Vuetify from "vuetify";

import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import vuetify from "./plugins/vuetify";
import PG from "./store/plugin.js";

Vue.use(Vuetify);
Vue.mixin(PG.mixin); //Vue.mixin 表示用於全域

new Vue({
  vuetify,
  router,
  store,
  PG,
  render: (h) => h(app),
}).$mount("#app");
