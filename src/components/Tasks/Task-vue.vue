<template>
  <p>{{ $store.state.formData }}</p>
  <p>{{ $store.state.actionData }}</p>
  <div className="h-screen mx-10">
    <div className="mx-auto p-2">
      <button
        type="button"
        className="p-2 col-span-1 rounded-md bg-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
        @click="
          $store.commit('setFormVisible');
          $store.commit('clearFormData');
          $store.commit('setActionData', 'Добавление');
        "
      >
        Добавить задачу
      </button>
    </div>
    <div v-if="$store.state.isFormVisible">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-800">
              {{ $store.state.actionData }} задачи
            </h2>
            <div
              className="mt-4 sm:mt-2 grid gap-x-6 sm:gap-x-3 sm:gap-y-4 gap-y-8 grid-cols-2 sm:grid-cols-6"
            >
              <div className="col-span-2">
                <label
                  for="taskTitle"
                  className="block text-sm font-medium leading-6 text-gray-800"
                  >Наименование задачи</label
                >
                <div className="mt-2">
                  <div>
                    <input
                      required
                      type="text"
                      name="taskTitle"
                      id="taskTitle"
                      maxlength="50"
                      minlength="1"
                      v-model="$store.state.formData.taskTitle"
                      className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6"
                      placeholder="Наименование задачи (до 50 симв.)"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  for="taskStatus"
                  className="block text-sm font-medium leading-6 text-gray-800"
                  >Статус</label
                >
                <div v-if="$store.state.formData.taskStatus" className="mt-2">
                  <select
                    required
                    id="taskStatus"
                    name="taskStatus"
                    v-model="$store.state.formData.taskStatus"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6"
                  >
                    <option
                      v-for="status in statuses"
                      :key="status"
                      :value="status.value"
                    >
                      {{ status.title }}
                    </option>
                  </select>
                </div>
                <div v-else className="mt-2">
                  <select
                    required
                    id="taskStatus"
                    name="taskStatus"
                    v-model="$store.state.formData.taskStatus"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6"
                  >
                    <option
                      v-for="status in statuses"
                      :key="status"
                      :value="status.value"
                    >
                      {{ status.title }}
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  for="taskUserId"
                  className="block text-sm font-medium leading-6 text-gray-800"
                  >Ответственный пользователь</label
                >
                <div v-if="$store.state.formData.taskUserId" className="mt-2">
                  <select
                    required
                    id="taskUserId"
                    name="taskUserId"
                    v-model="$store.state.formData.taskUserId"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6"
                  >
                    <option
                      v-for="user in usersResult.findAllUsers.users"
                      :key="user.username"
                      :value="user.id"
                    >
                      {{ user.username }}
                    </option>
                  </select>
                </div>
                <div v-else className="mt-2">
                  <select
                    required
                    id="taskUserId"
                    name="taskUserId"
                    v-model="$store.state.formData.taskUserId"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6"
                  >
                    <option
                      v-for="user in usersResult.findAllUsers.users"
                      :key="user.id"
                      :value="user.id"
                    >
                      {{ user.username }}
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  for="taskBody"
                  className="block text-sm font-medium leading-6 text-gray-800"
                  >Текст задачи</label
                >
                <div className="mt-2">
                  <textarea
                    required
                    id="taskBody"
                    name="taskBody"
                    rows="3"
                    maxlength="255"
                    minlength="1"
                    v-model="$store.state.formData.taskBody"
                    placeholder="Текст задачи (До 255 символов)"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6"
                  />
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
              $store.state.formData.taskTitle &&
                $store.state.formData.taskTitle !== '' &&
                $store.state.formData.taskBody &&
                $store.state.formData.taskBody !== '' &&
                $store.state.formData.taskStatus &&
                $store.state.formData.taskUserId && //Не смог найти нормальный способ с валидацией, путем описания этой проверки в main.js через action в vuex обратиться к форме не получается, т.к. undefined
                $store.state.actionData === 'Добавление' &&
                createTask({
                  input: {
                    taskTitle: $store.state.formData.taskTitle,
                    taskBody: $store.state.formData.taskBody,
                    taskStatus: $store.state.formData.taskStatus,
                    taskUserId: $store.state.formData.taskUserId,
                    task_from: $store.state.formData.task_from,
                    task_to: $store.state.formData.task_to,
                  },
                })
                  .then(query.refetch())
                  .then($store.commit('clearFormData'))
                  .then($store.commit('setFormVisible'));
              $store.state.formData.taskTitle &&
                $store.state.formData.taskTitle !== '' &&
                $store.state.formData.taskBody &&
                $store.state.formData.taskBody !== '' &&
                $store.state.formData.taskStatus &&
                $store.state.formData.taskUserId && //Не смог найти нормальный способ с валидацией, путем описания этой проверки в main.js через action в vuex обратиться к форме не получается, т.к. undefined
                $store.state.actionData === 'Редактирование' &&
                updateTask({
                  input: {
                    id: $store.state.formData.taskId,
                    taskTitle: $store.state.formData.taskTitle,
                    taskBody: $store.state.formData.taskBody,
                    taskStatus: $store.state.formData.taskStatus,
                    taskUserId: $store.state.formData.taskUserId,
                    task_from: $store.state.formData.task_from,
                    task_to: $store.state.formData.task_to,
                  },
                })
                  .then(query.refetch())
                  .then($store.commit('clearFormData'))
                  .then($store.commit('setFormVisible'));
            "
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
    <div>
      <div v-if="taskError && taskLoading && usersLoading && usersError">
        <p v-if="taskError && usersError">
          Что-то пошло не так... {{ taskError && taskError }}
          {{ usersError && usersError }}
        </p>
        <p v-if="taskLoading && usersLoading">Загрузка...</p>
      </div>
      <div
        v-else
        className="mx-0 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
      >
        <div
          className="text-gray-800 m-2 max-w-lg gap-x-8 gap-y-12 p-2 hover:ring-indigo-800 hover:ring-4 ring-2 ring-gray-500 rounded-3xl bg-gray-300 drop-shadow-2xl"
          v-for="task in taskResult.findAllTasks.tasks"
          :key="task.id"
        >
          <div className="grid min-h-full">
            <div className="grid grid-cols-3 col-span-full">
              <div className="text-2xl break-all col-span-2">
                {{
                  task.taskTitle.length > 10
                    ? task.taskTitle.slice(0, 10) + "..."
                    : task.taskTitle
                }}
              </div>
              <div
                className="justify-self-end mr-1 text-base flex my-auto col-span-1"
              >
                <img
                  className="max-h-4"
                  :src="'/icons/' + statuses[task.taskStatus].icon"
                  :alt="task.taskTitle"
                />
                {{ statuses[task.taskStatus].title }}
              </div>
            </div>
            <div className="text-xl break-all col-span-full">
              <!-- Хорошо бы по словам обрывать, но я специально в пример пихнул длинную балду текста без разделителей -->
              {{
                task.taskBody.length > 30
                  ? task.taskBody.slice(0, 30) + "..."
                  : task.taskBody
              }}
            </div>
            <div className="text-lg col-span-full">
              {{ new Date(task.task_from).toLocaleDateString() }} -
              {{ new Date(task.task_to).toLocaleDateString() }}
            </div>
            <div className="mx-auto text-center col-span-full my-2">
              <button
                type="button"
                className="m-2 rounded-md bg-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
                @click="
                  $store.commit('setFormData', {
                    taskId: task.id,
                  });
                  removeTask({
                    input: {
                      id: $store.state.formData.taskId,
                    },
                  })
                    .then(query.refetch())
                    .then($store.commit('clearFormData'));
                "
              >
                <!--
                  Модалку бы сюда на удаление...
                -->
                Удалить
              </button>
              <button
                type="button"
                className="m-2 rounded-md bg-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
                @click="
                  $store.commit('setFormData', {
                    taskId: task.id,
                    taskTitle: task.taskTitle,
                    taskBody: task.taskBody,
                    taskStatus: task.taskStatus,
                    task_from: task.task_from,
                    task_to: task.task_to,
                    taskUserId: task.taskUserId,
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
import { statuses } from "@/mappings";
import { FIND_ALL_TASKS_QUERY } from "@/graphql/queries/findAllTasks.js";
import { FIND_ALL_USERS_QUERY } from "@/graphql/queries/findAllUsers.js";
import { CREATE_TASK_MUTATION } from "@/graphql/mutations/createTask.js";
import { UPDATE_TASK_MUTATION } from "@/graphql/mutations/updateTask.js";
import { REMOVE_TASK_MUTATION } from "@/graphql/mutations/removeTask.js";
import { store } from "@/main";

export default {
  name: "TaskVue",
  setup() {
    const {
      result: taskResult,
      loading: taskLoading,
      error: taskError,
      query,
    } = useQuery(FIND_ALL_TASKS_QUERY);
    const {
      result: usersResult,
      loading: usersLoading,
      error: usersError,
    } = useQuery(FIND_ALL_USERS_QUERY);
    const {
      result: taskCreateResult,
      loading: taskCreateLoading,
      error: taskCreateError,
      mutate: createTask,
    } = useMutation(CREATE_TASK_MUTATION, () => ({
      variables: {
        input: {
          taskTitle: store.state.formData.taskTitle,
          taskBody: store.state.formData.taskBody,
          taskStatus: store.state.formData.taskStatus,
          taskUserId: store.state.formData.taskUserId,
          task_from: store.state.formData.task_from,
          task_to: store.state.formData.task_to,
        },
      },
      /*
      update: (cache, { data: { createTask } }) => {
        let data = cache.readQuery({ query: FIND_ALL_TASKS_QUERY });
        data = {
          ...data,
          tasks: [...data.findAllTasks.tasks, createTask.task],
        };
        cache.writeQuery({ query: FIND_ALL_TASKS_QUERY, data });
      },
    */
    }));
    const {
      result: taskUpdateResult,
      loading: taskUpdateLoading,
      error: taskUpdateError,
      mutate: updateTask,
    } = useMutation(UPDATE_TASK_MUTATION, () => ({
      variables: {
        input: {
          id: store.state.formData.taskId,
          taskTitle: store.state.formData.taskTitle,
          taskBody: store.state.formData.taskBody,
          taskStatus: store.state.formData.taskStatus,
          taskUserId: store.state.formData.taskUserId,
          task_from: store.state.formData.task_from,
          task_to: store.state.formData.task_to,
        },
      },
      /*
      update: (cache, { data: { updateTask } }) => {
        let data = cache.readQuery({ query: FIND_ALL_TASKS_QUERY });
        data = {
          ...data,
          tasks: [...data.findAllTasks.tasks, updateTask.task],
        };
        cache.writeQuery({ query: FIND_ALL_TASKS_QUERY, data });
      },
      */
    }));
    const {
      result: taskRemoveResult,
      loading: taskRemoveLoading,
      error: taskRemoveError,
      mutate: removeTask,
    } = useMutation(REMOVE_TASK_MUTATION, () => ({
      variables: {
        input: {
          id: store.state.formData.taskId,
        },
      },
      /*
      update: (cache, { data: { removeTask } }) => {
        let data = cache.readQuery({ query: FIND_ALL_TASKS_QUERY });
        data = {
          ...data,
          tasks: [...data.findAllTasks.tasks, removeTask.task],
        };
        cache.writeQuery({ query: FIND_ALL_TASKS_QUERY, data });
      },
      */
    }));
    return {
      statuses,
      taskResult,
      taskLoading,
      taskError,
      query,
      usersResult,
      usersLoading,
      usersError,
      taskCreateResult,
      taskCreateLoading,
      taskCreateError,
      taskUpdateResult,
      taskUpdateLoading,
      taskUpdateError,
      taskRemoveResult,
      taskRemoveLoading,
      taskRemoveError,
      createTask,
      updateTask,
      removeTask,
    };
  },
};
</script>
