<template>
  <div className="h-screen mx-10">
    <div className="mx-auto p-2">
      <button
        type="button"
        className="p-2 col-span-1 rounded-md bg-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
        @click="
          $store.commit('setFormVisible');
          $store.commit('clearUserData');
          $store.commit('setActionData', 'Добавление');
        "
      >
        Добавить пользователя
      </button>
    </div>
    <div v-if="$store.state.isFormVisible">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-800">
              {{ $store.state.actionData }} пользователя
            </h2>
            <div
              className="mt-4 sm:mt-2 grid gap-x-6 sm:gap-x-3 sm:gap-y-4 gap-y-8 grid-cols-2 sm:grid-cols-6"
            >
              <div className="col-span-full">
                <label
                  for="username"
                  className="block text-sm font-medium leading-6 text-gray-800"
                  >Имя пользователя</label
                >
                <div className="mt-2">
                  <div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      maxlength="20"
                      v-model="$store.state.userData.username"
                      className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6"
                      placeholder="Имя пользователя (до 20 симв.)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-800"
            @click="$store.commit('setFormVisible')"
          >
            Отменить
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-800 px-3 py-2 text-sm font-semibold text-gray-200 shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
            @click="
              ($store.state.userData.username ||
                $store.state.userData.username !== '') && //Не смог найти нормальный способ с валидацией, путем описания этой проверки в main.js через action в vuex обратиться к форме не получается, т.к. undefined
                $store.state.actionData === 'Добавление' &&
                createUser({
                  input: {
                    username: $store.state.userData.username,
                  },
                })
                  .then(query.refetch())
                  .then($store.commit('clearUsermData'))
                  .then($store.commit('setFormVisible'));
              ($store.state.userData.id ||
                $store.state.userData.username ||
                $store.state.userData.username !== '') && //Не смог найти нормальный способ с валидацией, путем описания этой проверки в main.js через action в vuex обратиться к форме не получается, т.к. undefined
                $store.state.actionData === 'Редактирование' &&
                updateUser({
                  input: {
                    id: $store.state.userData.id,
                    username: $store.state.userData.username,
                  },
                })
                  .then(query.refetch())
                  .then($store.commit('clearUsermData'))
                  .then($store.commit('setFormVisible'));
            "
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
    <div>
      <div v-if="usersLoading || usersError">
        <p v-if="usersError">
          Что-то пошло не так... {{ usersError && usersError }}
        </p>
        <p v-if="usersLoading">Загрузка...</p>
      </div>
      <div
        v-else
        className="mx-0 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
      >
        <div
          className="text-gray-800 m-2 max-w-lg gap-x-8 gap-y-12 p-2 hover:ring-indigo-800 hover:ring-4 ring-2 ring-gray-500 rounded-3xl bg-gray-300 drop-shadow-2xl"
          v-for="user in usersResult.findAllUsers.users"
          :key="user.id"
        >
          <div className="grid min-h-full">
            <div className="grid grid-cols-3 col-span-full">
              <div className="text-2xl break-all col-span-full">
                {{ user.username }}
              </div>
            </div>
            <div className="grid grid-cols-3 col-span-full">
              <div className="text-xl break-all col-span-full">
                <div v-if="user.tasks.length">
                  Задачи пользователя:
                  <li v-for="task in user.tasks" :key="task.id">
                    {{
                      task.taskTitle.length > 10
                        ? task.taskTitle.slice(0, 10) + "..."
                        : task.taskTitle
                    }}
                  </li>
                </div>
              </div>
            </div>
            <div className="mx-auto text-center col-span-full my-2">
              <button
                type="button"
                v-bind:class="
                  user.tasks.length
                    ? 'hidden'
                    : 'm-2 rounded-md bg-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800'
                "
                @click="
                  !user.tasks.length &&
                    $store.commit('setUserData', {
                      id: user.id,
                    });
                  !user.tasks.length &&
                    removeUser({
                      input: {
                        id: $store.state.userData.id,
                      },
                    });
                  $store.commit('clearUserData');
                  query.refetch();
                "
              >
                Удалить
              </button>
              <!--//className="m-2 rounded-md bg-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"-->
              <button
                type="button"
                className="m-2 rounded-md bg-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
                @click="
                  $store.commit('setUserData', {
                    id: user.id,
                    username: user.username,
                  });
                  !$store.state.isFormVisible &&
                    $store.commit('setFormVisible');
                  $store.commit('setActionData', 'Редактирование');
                "
              >
                Редактировать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMutation, useQuery } from "@vue/apollo-composable";
import { FIND_ALL_USERS_QUERY } from "@/graphql/queries/findAllUsers.js";
import { CREATE_USER_MUTATION } from "@/graphql/mutations/createUser.js";
import { UPDATE_USER_MUTATION } from "@/graphql/mutations/updateUser.js";
import { REMOVE_USER_MUTATION } from "@/graphql/mutations/removeUser.js";
import { store } from "@/main";

export default {
  name: "UserVue",
  setup() {
    const {
      result: usersResult,
      loading: usersLoading,
      error: usersError,
      query,
    } = useQuery(FIND_ALL_USERS_QUERY);
    const {
      result: userCreateResult,
      loading: userCreateLoading,
      error: userCreateError,
      mutate: createUser,
    } = useMutation(CREATE_USER_MUTATION, () => ({
      variables: {
        input: {
          username: store.state.userData.username,
        },
      },
      /*
        update: (cache, { data: { createUser } }) => {
          let data = cache.readQuery({ query: FIND_ALL_USERS_QUERY });
          data = {
            ...data,
            users: [...data.findAllUsers.users, createUser.user],
          };
          cache.writeQuery({ query: FIND_ALL_USERS_QUERY, data });
        },
      */
    }));
    const {
      result: userUpdateResult,
      loading: userUpdateLoading,
      error: userUpdateError,
      mutate: updateUser,
    } = useMutation(UPDATE_USER_MUTATION, () => ({
      variables: {
        input: {
          id: store.state.userData.id,
          username: store.state.userData.username,
        },
      },
      /*
        update: (cache, { data: { updateUser } }) => {
          let data = cache.readQuery({ query: FIND_ALL_USERS_QUERY });
          data = {
            ...data,
            users: [...data.findAllUsers.users, updateUser.user],
          };
          cache.writeQuery({ query: FIND_ALL_USERS_QUERY, data });
        },
        */
    }));
    const {
      result: userRemoveResult,
      loading: userRemoveLoading,
      error: userRemoveError,
      mutate: removeUser,
    } = useMutation(REMOVE_USER_MUTATION, () => ({
      variables: {
        input: {
          id: store.state.userData.id,
        },
      },
      /*
        update: (cache, { data: { removeUser } }) => {
          let data = cache.readQuery({ query: FIND_ALL_USERS_QUERY });
          data = {
            ...data,
            users: [...data.findAllUsers.users, removeUser.user],
          };
          cache.writeQuery({ query: FIND_ALL_USERS_QUERY, data });
        },
        */
    }));
    return {
      query,
      usersResult,
      usersLoading,
      usersError,
      userCreateResult,
      userCreateLoading,
      userCreateError,
      userUpdateResult,
      userUpdateLoading,
      userUpdateError,
      userRemoveResult,
      userRemoveLoading,
      userRemoveError,
      createUser,
      updateUser,
      removeUser,
    };
  },
};
</script>
