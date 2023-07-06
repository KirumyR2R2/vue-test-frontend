<template>
  <div
    className="h-screen w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800"
  >
    <div className="py-2 w-11/12 mx-auto font-serif font-semibold">
      <div
        className="p-4 mt-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-11/12 mx-auto shadow-2xl"
      >
        <nav className="grid grid-cols-2 gap-3">
          <ul v-for="item in nav" :key="item.name" :value="item.name">
            <router-link :to="item.href">
              <div
                className="hover:bg-gradient-to-r from-gray-300 to-gray-200 ring-1 ring-black hover:ring-blue-800 bg-gray-300 p-1 text-center drop-shadow-lg"
              >
                {{ item.name }}
              </div></router-link
            >
          </ul>
        </nav>
      </div>
      <div
        className="min-h-full my-4 h-full ring-2 px-2 py-6 shadow-2xl ring-gray-900 relative"
      >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { navigations } from "@/mappings";
export default {
  name: "App",
  setup() {
    const nav = navigations;
    return {
      nav,
    };
  },
};
</script>
