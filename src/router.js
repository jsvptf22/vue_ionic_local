import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Check from "./components/Check";
import Items from "./components/Items";
import History from "./components/History";

const routes = [
    { path: "/items", component: Items },
    { path: "/check", component: Check },
    { path: "/history", component: History },
    { path: "/", component: Items }
];

const router = new VueRouter({
    routes
});

export default router;
