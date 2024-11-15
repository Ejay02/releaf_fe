<template>
  <NavBar v-if="$route.path !== '/'" />
  <RouterView class="" />
</template>

<script setup>
import { watch } from "vue";
import { useUserStore } from "./stores/userStore";
import NavBar from "@/components/NavBar.vue";
import { useRoute } from "vue-router";

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
