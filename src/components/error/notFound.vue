<template>
  <div class="flex h-screen justify-center items-center flex-col">
    <h1 class="text-9xl font-bold mb-0">404</h1>
    <h2 class="text-3xl mb-4">Page Not Found</h2>
    <p class="text-lg text-gray-500 mb-8">
      The page you're looking for doesn't exist.
    </p>
    <div class="flex gap-4">
      <router-link
        to="/dashboard"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Home
      </router-link>
    </div>
  </div>
</template>

<script setup></script>
