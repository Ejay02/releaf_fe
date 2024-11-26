<template>
  <div
    class="relative min-h-screen bg-cover bg-center flex items-center justify-center"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- Loading Screen -->
    <LoadingScreen v-if="isLoading" />

    <!-- Overlay for dimming the background image -->
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <!-- Login Form Container -->
    <div
      class="relative z-10 bg-white bg-opacity-80 rounded-lg p-8 max-w-md w-full text-center shadow-lg"
    >
      <h1 class="text-2xl font-semibold text-gray-800 mb-4">Welcome</h1>
      <p class="text-gray-600 mb-6">Sign in or sign up to continue</p>

      <!-- Login Form -->
      <form class="space-y-4" @submit.prevent="">
        <input
          v-model="email"
          autofocus
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 text-sm text-gray-800 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
        />

        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            required
            placeholder="Password"
            minlength="8"
            class="w-full px-4 py-2 text-sm text-gray-800 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
            @click="togglePasswordVisibility('password')"
          >
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>

        <!--  -->

        <button
          @click="handleLogin"
          type="submit"
          :disabled="isDisabled || isLoading"
          :class="[
            'w-full py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
            isDisabled || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white',
          ]"
        >
          {{ isLoading ? "Logging in..." : "Log In" }}
        </button>

        <p class="text-sm text-gray-600">
          Don’t have an account?
          <router-link to="/signup" class="text-indigo-600 hover:underline"
            >Sign up</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import api from "../composables/apiService";
import backgroundImage from "@/assets/earth.jpg";
import { useUserStore } from "../stores/userStore";
import { useNotifications } from "../composables/globalAlert";
import LoadingScreen from "../components/loadingScreen.vue";

const email = ref("");
const password = ref("");
const router = useRouter();
const isLoading = ref(false);
const userStore = useUserStore();
const { notify } = useNotifications();

const isDisabled = computed(() => {
  return email.value.trim() === "" || password.value.trim() === "";
});

const showPassword = ref(false);

const togglePasswordVisibility = (field) => {
  if (field === "password") {
    showPassword.value = !showPassword.value;
  }
};

const handleLogin = async () => {
  try {
    isLoading.value = true;
    const res = await api.post("user/login", {
      email: email.value,
      password: password.value,
    });

    if (res.data) {
      userStore.setToken(res.data.token);
      userStore.setUser(res.data.user);
      notify("Login Successful", "success");
      router.push("/dashboard");
    }
    email.value = "";
    password.value = "";
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An error occurred during login";

    notify(errorMessage, "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
