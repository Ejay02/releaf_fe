<template>
  <NavBar v-if="$route.path !== '/' && $route.path !== '/signup'" />
  <RouterView />
  <DeleteModal v-if="modalStore.deleteModal" />
</template>

<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./components/navBar.vue";
import { useUserStore } from "./stores/userStore";
import { useModalStore } from "./stores/useModalStore";
import DeleteModal from "./components/modals/deleteModal.vue";

const userStore = useUserStore();
const $route = useRoute();
const modalStore = useModalStore();

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
