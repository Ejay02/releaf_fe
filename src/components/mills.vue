<template>
  <div class="container mx-auto p-4 cursor-pointer">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Mills List</h2>
      <button
        @click="openAddModal"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add New Mill
      </button>
    </div>

    <!-- Mills Table -->
    <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="py-2 px-4 text-left">Mill Name</th>
          <th class="py-2 px-4 text-left">Latitude</th>
          <th class="py-2 px-4 text-left">Longitude</th>
          <th class="py-2 px-4 text-left">P1 Amount</th>
          <th class="py-2 px-4 text-left">Transactions</th>
          <th class="py-2 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="mill in paginatedMills"
          :key="mill.millName"
          class="border-b hover:bg-gray-50"
        >
          <td class="py-2 px-4">{{ mill.millName }}</td>
          <td class="py-2 px-4">{{ mill.latitude }}</td>
          <td class="py-2 px-4">{{ mill.longitude }}</td>
          <td class="py-2 px-4">{{ mill.p1Amount }}</td>
          <td class="py-2 px-4">{{ mill.numTransactions }}</td>
          <td class="py-2 px-4 flex space-x-2">
            <button
              @click="openEditModal(mill)"
              class="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              @click="deleteMill(mill.millName)"
              class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <button
        :disabled="currentPage <= 1"
        @click="changePage(currentPage - 1)"
        class="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400"
      >
        Previous
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
        :disabled="currentPage >= totalPages"
        @click="changePage(currentPage + 1)"
        class="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchMillData } from "../utils/dataService";

const mills = ref([]); // All mills data
const currentPage = ref(1);
const itemsPerPage = ref(5); // Number of items per page
const totalPages = computed(() => Math.ceil(mills.value.length / itemsPerPage.value));

// Computed property to get mills for the current page
const paginatedMills = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return mills.value.slice(start, end);
});

const fetchMills = async () => {
  try {
    const data = await fetchMillData();
    mills.value = data;
  } catch (error) {
    console.error("Failed to load mills:", error);
  }
};

const openAddModal = () => {
  // Logic to open add modal
};

const openEditModal = (mill) => {
  // Logic to open edit modal
};

const closeModal = () => {
  // Logic to close modal
};

const handleFormSubmit = () => {
  // Logic to handle form submission
};

const deleteMill = (millName) => {
  mills.value = mills.value.filter((mill) => mill.millName !== millName);
  // Ensure we reset to the last page if mills on the current page are deleted
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
};

const changePage = (newPage) => {
  currentPage.value = newPage;
};

onMounted(() => {
  fetchMills(); // Fetch mills data when the component is mounted
});
</script>

<style scoped>
/* Add any custom styles you need */
</style>
