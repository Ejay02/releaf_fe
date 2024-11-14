<template>
  <div class="h-screen w-full">
    <!-- <LoadingScreen v-if="loading" /> -->
    <div id="map" class="h-full w-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchMillData } from "../utils/dataService";

// Leaflet marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useNotifications } from "../composables/globalAlert";
// import LoadingScreen from "./loadingScreen.vue";

const { notify } = useNotifications();

// Set default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const mills = ref([]);
let map = null;

// Get status color based on last transaction date
const getStatusColor = (lastTransactionDate) => {
  const diffDays =
    (new Date() - new Date(lastTransactionDate)) / (1000 * 60 * 60 * 24);
  return diffDays <= 7 ? "green" : diffDays <= 14 ? "yellow" : "red";
};

// Initialize map and add markers
const initializeMap = () => {
  map = L.map("map").setView([5.587366, 8.133794], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Add mill markers
  mills.value.forEach((mill) => {
    const marker = L.marker([mill.latitude, mill.longitude]).addTo(map);

    // Create popup content with status indicator
    const statusColor = getStatusColor(mill.lastTransactionDate);
    const popupContent = `
      <div class="p-4 cursor-pointer">
        <h3 class="font-bold text-lg mb-2">${mill.millName}</h3>
        <div class="flex items-center mb-2">
          <span class="w-3 h-3 rounded-full mr-2" style="background-color: ${statusColor}"></span>
          <span>Status</span>
        </div>
        <div class="space-y-1">
          <p><span class="font-semibold">P1 Amount:</span> ${
            mill.p1Amount
          } tons</p>
          <p><span class="font-semibold">Price per ton:</span> $${
            mill.p1PriceTon
          }</p>
          <p><span class="font-semibold">Transactions:</span> ${
            mill.numTransactions
          }</p>
          <p><span class="font-semibold">Last Transaction:</span> ${new Date(
            mill.lastTransactionDate
          ).toLocaleDateString()}</p>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent);
  });

  // Add click handler for adding PKS dumpsites
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    addPKSDumpsite(lat, lng);
  });
};

// Function to add new PKS dumpsite
const addPKSDumpsite = (lat, lng) => {
  const marker = L.marker([lat, lng]).addTo(map);

  // Create form popup for dumpsite details
  const formContent = `
    <div class="p-4">
      <h3 class="font-bold text-lg mb-4">Add PKS Dumpsite</h3>
      <form id="dumpsiteForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Capacity (tons)</label>
          <input type="number" name="capacity" class="w-full p-2 border rounded" required>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Status</label>
          <select name="status" class="w-full p-2 border rounded" required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Save
        </button>
      </form>
    </div>
  `;

  marker.bindPopup(formContent).openPopup();

  // Handle form submission
  setTimeout(() => {
    const form = document.getElementById("dumpsiteForm");
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        // Save dumpsite data (implement API call here)
        const dumpsiteData = {
          latitude: lat,
          longitude: lng,
          capacity: formData.get("capacity"),
          status: formData.get("status"),
        };

        console.log("Saving dumpsite:", dumpsiteData);
        notify("Dumpsite created", "success");
        // TODO: Implement API call to save dumpsite
        marker.closePopup();
      };
    }
  }, 100);
};

onMounted(async () => {
  try {
    mills.value = await fetchMillData();
    initializeMap();
  } catch (error) {
    notify("Failed to initialize map", "error");
  }
});
</script>

<style>
@import "leaflet/dist/leaflet.css";

.leaflet-popup-content-wrapper {
  @apply shadow-lg;
}

.leaflet-popup-content {
  margin: 0 !important;
}
</style>
