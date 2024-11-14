<template>
  <div class="relative">
    <NavBar />

    <div class="map-container relative z-10">
      <MapView />
    </div>
  </div>
</template>

<script setup>
import MapView from "@/components/mapView.vue";
import NavBar from "../components/navBar.vue";
</script>

<style scoped></style>
