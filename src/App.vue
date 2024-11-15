<template>
  <NavBar />
  <RouterView />
</template>

<script setup>
import { watch } from "vue";
import { useUserStore } from "./stores/userStore";
import NavBar from "@/components/NavBar.vue";

const userStore = useUserStore();

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
