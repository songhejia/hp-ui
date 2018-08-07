import Vue from "vue";
import App from "./App.vue";
import "font-awesome/css/font-awesome.min.css";
import "../packages/base.scss";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
