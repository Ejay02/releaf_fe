<template>
  <NavBar v-if="$route.path !== '/' && $route.path !== '/signup'" />
  <RouterView class="" />
</template>

<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./components/navBar.vue";
import { useUserStore } from "./stores/userStore";

const userStore = useUserStore();
const $route = useRoute();

// Check if token is missing and log out the user if true
watch(
  () => userStore.token,
  (newToken) => {
    if (!newToken) {
      userStore.clearUserData();
    }
  },
  { immediate: true } // Runs the watch immediately when the component mounts
);
</script>
