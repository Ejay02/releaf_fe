<template>
  <div class="flex h-screen justify-center items-center flex-col text-gray-500">
    <h1 class="text-9xl font-bold mb-0">404</h1>
    <h2 class="text-3xl mb-4">Page Not Found</h2>
    <p class="text-lg text-gray-400 mb-8">
      The page you're looking for doesn't exist.
    </p>
    <div class="flex gap-4">
      <router-link
        to="/dashboard"
        class="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium bg-indigo-500 mt-3 px-4 py-2 rounded-lg tracking-wide text-white"
      >
        Go Home
      </router-link>
    </div>
  </div>
</template>

<script setup></script>
