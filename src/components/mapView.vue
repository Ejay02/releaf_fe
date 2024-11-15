<template>
  <div class="h-screen w-full">
    <!-- Loading Screen -->
    <LoadingScreen
      v-if="isLoading"
      :msg="'Please wait while we fetch the mill locations'"
    />

    <!-- Map Container -->
    <div id="map" class="h-full w-full"></div>
  </div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref } from "vue";
import api from "../composables/apiService";
import LoadingScreen from "./loadingScreen.vue";
import { fetchMillData } from "../utils/dataService";
import { useNotifications } from "../composables/globalAlert";

// Leaflet marker icons
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Use notifications for success/error messages
const { notify } = useNotifications();

// Define mills data and map reference
const mills = ref([]);
let map = null;

const isLoading = ref(true);

// Set default marker icons
const setMarkerIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl; // Remove default icon
  L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
  });
};

// Get status color based on last transaction date
const getStatusColor = (lastTransactionDate) => {
  const diffDays =
    (new Date() - new Date(lastTransactionDate)) / (1000 * 60 * 60 * 24);
  return diffDays <= 7 ? "green" : diffDays <= 14 ? "yellow" : "red";
};

// Initialize map and add markers for mills
const initializeMap = () => {
  map = L.map("map").setView([5.587366, 8.133794], 13); // Set initial view of the map

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Add mill markers to the map
  mills.value.forEach((mill) => {
    addMillMarker(mill);
  });

  // Add click event to map for adding PKS dumpsites
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    addPKSDumpsite(lat, lng); // Add PKS dumpsite marker on map click
  });
};

// Add mill marker with status and popup content
const addMillMarker = (mill) => {
  const marker = L.marker([mill.latitude, mill.longitude]).addTo(map);
  const statusColor = getStatusColor(mill.lastTransactionDate);

  // Create the popup content for each mill
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

  // Bind the popup to the marker
  marker.bindPopup(popupContent);
};

// Add a PKS dumpsite marker with form for details
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

  // Bind the form content to the marker popup
  marker.bindPopup(formContent).openPopup();

  // Handle form submission for PKS dumpsite
  setTimeout(() => {
    const form = document.getElementById("dumpsiteForm");
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        // Collect dumpsite data from the form
        const dumpsiteData = {
          latitude: lat,
          longitude: lng,
          capacity: parseFloat(formData.get("capacity")),
          status: formData.get("status"),
        };

        const token = localStorage.getItem("accessToken");

        try {
          // Make a POST request to save the dumpsite data
          const res = await api.post("/dumpsites", dumpsiteData, {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token to the request
            },
          });

          if (res.data) {
            notify("Dumpsite created successfully", "success");
            marker.closePopup(); // Close popup after form submission
          }
        } catch (error) {
          notify("Error saving dumpsite", "error");
        }
      };
    }
  }, 100);
};

// Fetch mill data and initialize map
onMounted(async () => {
  try {
    mills.value = await fetchMillData(); // Fetch mill data from API
    setMarkerIcons(); // Set the marker icons
    initializeMap(); // Initialize map with markers
  } catch (error) {
    notify("Failed to initialize map", "error"); // Show error notification if fetching mills fails
  }
});
// onMounted(async () => {
//   try {
//     mills.value = await fetchMillData(); // Fetch mill data from API
//     setMarkerIcons(); // Set the marker icons
//     initializeMap(); // Initialize map with markers

//     // event listener for when the map's tiles are loaded
//     map.whenReady(() => {
//       setTimeout(() => {
//         isLoading.value = false;
//       }, 500); // Small delay to ensure smooth transition
//     });
//   } catch (error) {
//     console.log("error:", error);
//     // notify("Failed to initialize map", "error");
//     isLoading.value = false;
//   }
// });
</script>

<style scoped>
@import "leaflet/dist/leaflet.css";

.leaflet-popup-content-wrapper {
  @apply shadow-lg;
}

.leaflet-popup-content {
  margin: 0 !important;
}
</style>
