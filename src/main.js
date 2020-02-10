import Vue from "vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Ionic from "@ionic/vue";
import "@ionic/core/css/ionic.bundle.css";

import router from "./router";
import store from "./store";
import App from "./App.vue";

Vue.use(Ionic);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    store
}).$mount("#app");
