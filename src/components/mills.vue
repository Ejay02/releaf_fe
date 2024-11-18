<template>
  <div class="container mx-auto p-4">
    <LoadingScreen v-if="isLoading" :msg="'Loading mills data'" />

    <div v-else>
      <div
        class="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0"
      >
        <div class="relative flex-1 sm:max-w-xs w-full">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search mills..."
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            @input="handleSearch"
          />
          <span
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-3 top-2.5 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>

        <button
          @click="openAddModal"
          class="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2"
        >
          Add New Mill
        </button>
      </div>

      <div class="overflow-x-auto">
        <table
          class="w-full bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <thead class="hidden sm:table-header-group bg-gray-100">
            <tr>
              <th class="py-2 px-4 text-left">Mill Name</th>
              <th class="py-2 px-4 text-left">Latitude</th>
              <th class="py-2 px-4 text-left">Longitude</th>
              <th class="py-2 px-4 text-left">Amount(p1)</th>
              <th class="py-2 px-4 text-left">Transactions</th>
              <th class="py-2 px-4 text-left">PriceTon(p1)</th>
              <th class="py-2 px-4 text-left">Date</th>
              <th class="py-2 px-4 text-right"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="mill in paginatedMills"
              :key="mill.millName"
              class="border-b hover:bg-gray-50 flex flex-col sm:table-row"
            >
              <td class="py-2 px-4 sm:table-cell" data-label="Latitude">
                {{ mill.millName }}
              </td>
              <td class="py-2 px-4 sm:table-cell" data-label="Latitude">
                {{ mill.latitude }}
              </td>
              <td class="py-2 px-4 sm:table-cell" data-label="Longitude">
                {{ mill.longitude }}
              </td>
              <td class="py-2 px-4 sm:table-cell" data-label="Capacity">
                {{ mill.p1Amount }}
              </td>
              <td class="py-2 px-4 sm:table-cell" data-label="Capacity">
                {{ mill.numTransactions }}
              </td>
              <td class="py-2 px-4 sm:table-cell" data-label="Capacity">
                {{ mill.p1PriceTon }}
              </td>
              <td class="py-2 px-4 sm:table-cell" data-label="Capacity">
                {{
                  new Date(mill?.lastTransactionDate).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )
                }}
              </td>

              <td class="py-2 px-4 flex justify-end space-x-2">
                <div @click="openEditModal(mill)" class="cursor-pointer">
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
                <div
                  @click="showDeleteModal('001', mill.millName, 'mill')"
                  class="cursor-pointer"
                >
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
      <Pagination :items="mills" :itemsPerPage="10" @pageChange="updateMills" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Pagination from "./pagination.vue";
import LoadingScreen from "./loadingScreen.vue";
import { fetchMillData } from "../utils/dataService";
import { useModalStore } from "../stores/useModalStore";

const mills = ref([]);
const paginatedMills = ref([]);
const searchQuery = ref("");
const isLoading = ref(true);

const modalStore = useModalStore();

const updateMills = (items) => {
  paginatedMills.value = items;
};

const handleFetchMills = async () => {
  try {
    isLoading.value = true;
    const data = await fetchMillData();
    mills.value = data;
  } catch (error) {
    notify("Failed to fetch mills data", "error");
  } finally {
    isLoading.value = false;
  }
};

const clearSearch = () => {
  searchQuery.value = "";
  handleFetchMills();
};

const openAddModal = () => {
  // Logic to open add modal
};

const openEditModal = (mill) => {
  // Logic to open edit modal
};

const showDeleteModal = (id, title, type) => {
  modalStore.deleteModal = true;
  modalStore.modalId = id;
  modalStore.modalTitle = title;
  modalStore.source = type;
};

const handleSearch = () => {
  if (!searchQuery.value) {
    handleFetchMills();
    return;
  }

  const query = searchQuery.value.toLowerCase().trim();
  mills.value = mills.value.filter((mill) =>
    Object.values(mill).some((value) =>
      value.toString().toLowerCase().includes(query)
    )
  );
};

onMounted(() => {
  handleFetchMills();
});
</script>

<style scoped>
@media (max-width: 640px) {
  tbody tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    padding: 1rem;
  }

  tbody td {
    display: block;
    text-align: right;
    border-bottom: 1px solid #eee;
  }

  tbody td:last-child {
    border-bottom: none;
    display: flex;
  }

  tbody td::before {
    content: attr(data-label) " ";
    float: left;
    font-weight: bold;
  }
}
</style>
