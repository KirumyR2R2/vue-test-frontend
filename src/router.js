import { createRouter, createWebHashHistory } from "vue-router";
import HomeVue from "./components/Home-vue.vue";
import TaskVue from "./components/Tasks/Task-vue.vue";
import UserVue from "./components/Users/User-vue.vue";

export default createRouter({
  routes: [
    { path: "/", component: HomeVue },
    {
      path: "/tasks",
      component: TaskVue,
    },
    {
      path: "/users",
      component: UserVue,
    },
  ],
  history: createWebHashHistory(),
});
