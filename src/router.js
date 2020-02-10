import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Check from "./components/Check";
import Items from "./components/Items";
import Profits from "./components/Profits";
import State from "./components/State";

const routes = [
    { path: "/items", component: Items },
    { path: "/check", component: Check },
    { path: "/profits", component: Profits },
    { path: "/state", component: State }
];

const router = new VueRouter({
    routes
});

export default router;
