import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  // Fetch the user and token from localStorage if they exist
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = ref(localStorage.getItem("accessToken") || null);

  const user = ref(storedUser || null);

  const router = useRouter();

  const setUser = (userData) => {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData)); // Persist the user data
  };

  const setToken = (newToken) => {
    token.value = newToken;
    localStorage.setItem("accessToken", newToken); // Persist the token
  };

  const clearUserData = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    router.push("/");
  };

  if (!token.value) {
    clearUserData();
  }

  return {
    user,
    token,
    setUser,
    setToken,
    clearUserData,
  };
});
