import { createRouter, createWebHistory } from "vue-router";

import Login from "@/views/login.vue";
import SignUp from "@/views/signup.vue";

import Dashboard from "../views/dashboard.vue";
import Mills from "../components/mills.vue";
import Dumpsites from "../components/dumpsites.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/mills",
    name: "Mills",
    component: Mills,
  },
  {
    path: "/dumpsites",
    name: "Dumpsites",
    component: Dumpsites,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
