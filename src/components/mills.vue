<template>
  <div class="container mx-auto p-4">
    <div
      class="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0"
    >
      <h2 class="text-xl font-bold">Mills List</h2>
      <button
        @click="openAddModal"
        class="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add New Mill
      </button>
    </div>

    <!-- Mobile Card View -->
    <div class="block sm:hidden">
      <div
        v-for="mill in paginatedMills"
        :key="mill.millName"
        class="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4"
      >
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-semibold">{{ mill.millName }}</h3>
          <div class="flex space-x-2">
            <button
              @click="openEditModal(mill)"
              class="bg-yellow-500 text-white py-1 px-2 rounded text-sm hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              @click="deleteMill(mill.millName)"
              class="bg-red-500 text-white py-1 px-2 rounded text-sm hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span class="font-medium">Latitude:</span>
            <span>{{ mill.latitude }}</span>
          </div>
          <div>
            <span class="font-medium">Longitude:</span>
            <span>{{ mill.longitude }}</span>
          </div>
          <div>
            <span class="font-medium">P1 Amount:</span>
            <span>{{ mill.p1Amount }}</span>
          </div>
          <div>
            <span class="font-medium">Transactions:</span>
            <span>{{ mill.numTransactions }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Table View -->
    <div class="hidden sm:block overflow-x-auto">
      <table
        class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm"
      >
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
    </div>

    <!-- Pagination -->
    <div
      class="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0"
    >
      <button
        :disabled="currentPage <= 1"
        @click="changePage(currentPage - 1)"
        class="w-full sm:w-auto bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Previous
      </button>
      <span class="text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        :disabled="currentPage >= totalPages"
        @click="changePage(currentPage + 1)"
        class="w-full sm:w-auto bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchMillData } from "../utils/dataService";

const mills = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = computed(() =>
  Math.ceil(mills.value.length / itemsPerPage.value)
);

const paginatedMills = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return mills.value.slice(start, end);
});

const fetchMills = async () => {
  const data = await fetchMillData();
  mills.value = data;
};

const openAddModal = () => {
  // Logic to open add modal
};

const openEditModal = (mill) => {
  // Logic to open edit modal
};

const deleteMill = (millName) => {
  //logic to delete
};

const changePage = (newPage) => {
  currentPage.value = newPage;
};

onMounted(() => {
  fetchMills();
});
</script>
