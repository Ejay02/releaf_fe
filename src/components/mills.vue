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
        class="cursor-pointer bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4"
      >
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-semibold">{{ mill.millName }}</h3>
          <div class="flex space-x-2">
            <!-- ed -->
            <div class="" @click="openEditModal(mill)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-blue-300 hover:text-blue-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>

            <!-- del -->
            <div class="" @click="deleteMill(mill.millName)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-red-400 hover:text-red-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
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
        class="cursor-pointer min-w-full bg-white border border-gray-200 rounded-lg shadow-sm"
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
              <!-- ed -->
              <div class="" @click="openEditModal(mill)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 text-blue-300 hover:text-blue-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>

              <!-- del -->
              <div class="" @click="deleteMill(mill.millName)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 text-red-400 hover:text-red-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <!-- move to reusable component across-->
    <Pagination :items="mills" :itemsPerPage="5" @pageChange="updateMills" />
  </div>
</template>

<script setup>
import Pagination from "./pagination.vue";
import { ref, onMounted } from "vue";
import { fetchMillData } from "../utils/dataService";

const mills = ref([]);
const paginatedMills = ref([]);

const updateMills = (items) => {
  paginatedMills.value = items;
};

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

onMounted(() => {
  fetchMills();
});
</script>
