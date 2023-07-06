import { createApp, provide, h } from "vue";
import { createStore } from "vuex";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";
import router from "./router";
import "./index.css";

export const store = createStore({
  state() {
    return {
      userData: {
        id: null,
        username: null,
      },
      formData: {
        taskId: null,
        taskTitle: null,
        taskBody: null,
        taskStatus: null,
        task_from: new Date(),
        task_to: new Date(new Date().setDate(new Date().getDate() + 1)),
        taskUserId: null,
      },
      isFormVisible: false,
      actionData: null,
    };
  },
  mutations: {
    setActionData(state, actionData) {
      state.actionData = actionData;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
    setFormData(state, formData) {
      state.formData = formData;
    },
    clearFormData(state) {
      state.formData = {
        taskId: null,
        taskTitle: null,
        taskBody: null,
        taskStatus: null,
        task_from: new Date(),
        task_to: new Date(new Date().setDate(new Date().getDate() + 1)),
        taskUserId: null,
        taskUser: {
          username: null,
        },
      };
    },
    clearUserData(state) {
      state.userData = {
        id: null,
        username: null,
      };
    },
    setFormVisible(state) {
      state.isFormVisible = !state.isFormVisible;
    },
  },
  actions: {},
  getters: {},
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: `${process.env.VUE_APP_BACKEND_URI}/graphql`,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(store);
app.use(router);

app.mount("#app");
