<template>
  <nav class="bg-indigo-600 text-white p-4 shadow-md relative z-20">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Dashboard link -->
      <router-link
        to="/dashboard"
        class="text-2xl font-bold text-white"
        active-class="active-link"
      >
        Dashboard
      </router-link>

      <!-- Navigation links -->
      <div class="flex items-center space-x-4 md:space-x-8">
        <router-link
          to="/mills"
          class="text-sm md:text-base"
          active-class="active-link"
          >Mills</router-link
        >
        <router-link
          to="/dumpsites"
          class="text-sm md:text-base"
          active-class="active-link"
          >Dumpsites</router-link
        >
        <div class="relative">
          <button
            class="text-white flex items-center space-x-2"
            @click="toggleDropdown"
          >
            <span>Hello {{ user?.username }}</span>
            <i class="fas fa-caret-down"></i>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 text-gray-800 z-30"
          >
            <Dropdown />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

import Dropdown from "./dropdown.vue";
import { useUserStore } from "../stores/userStore";

const dropdownOpen = ref(false);
const userStore = useUserStore();

// Toggle dropdown visibility
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const user = userStore.user;
</script>

<style scoped>
.active-link {
  color: #F7DC6F;
  font: bold;
}
</style>
