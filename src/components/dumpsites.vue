<template>
  <div class="container mx-auto p-4">
    <!-- Loading Screen -->
    <LoadingScreen v-if="isLoading" :msg="'Loading dumpsite data'" />

    <div class="v-else">
      <!-- Header with Search -->
      <div
        class="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0"
      >
        <div class="flex items-center space-x-4 w-full sm:w-auto">
          <!-- Search Input -->
          <div class="relative flex-1 sm:max-w-xs">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search dumpsites..."
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        </div>

        <!-- add -->
        <button
          @click="openAddModal()"
          class="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add New Dumpsite
        </button>
      </div>

      <!-- Mobile Card View -->
      <div class="block sm:hidden">
        <div
          v-for="dumpsite in paginatedDumpsites"
          :key="dumpsite._id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4"
        >
          <div class="flex justify-between items-center mb-2">
            <div class="font-semibold">
              Status:
              <span
                :class="getStatusColor(dumpsite.status)"
                class="px-2 py-1 rounded-full text-xs text-gray-400"
                >{{ dumpsite.status }}</span
              >
            </div>
            <div class="flex space-x-2">
              <!-- edit -->
              <div class="" @click="openEditModal(dumpsite)">
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
              <div
                class=""
                @click="showDeleteModal(dumpsite._id, 'dumpsite', 'dumpsite')"
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
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span class="font-medium">Latitude:</span>
              <span>{{ dumpsite.latitude }}</span>
            </div>
            <div>
              <span class="font-medium">Longitude:</span>
              <span>{{ dumpsite.longitude }}</span>
            </div>
            <div>
              <span class="font-medium">Capacity:</span>
              <span>{{ dumpsite.capacity }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Table View -->
      <div class="hidden sm:block overflow-x-auto">
        <table
          class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer"
        >
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 text-left">Latitude</th>
              <th class="py-2 px-4 text-left">Longitude</th>
              <th class="py-2 px-4 text-left">Capacity</th>
              <th class="py-2 px-4 text-left">Status</th>
              <th class="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="dumpsite in paginatedDumpsites"
              :key="dumpsite._id"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-2 px-4">{{ dumpsite.latitude }}</td>
              <td class="py-2 px-4">{{ dumpsite.longitude }}</td>
              <td class="py-2 px-4">{{ dumpsite.capacity }}</td>
              <td class="py-2 px-4">
                <span
                  class="px-2 py-1 rounded-full text-xs text-gray-400"
                  :class="getStatusColor(dumpsite.status)"
                >
                  {{ dumpsite.status }}
                </span>
              </td>
              <td class="py-2 px-4 flex space-x-2">
                <!-- edit -->
                <div class="" @click="openEditModal(dumpsite)">
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
                  class=""
                  @click="showDeleteModal(dumpsite._id, null, 'dumpsite')"
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
      <Pagination
        :items="dumpsites"
        :itemsPerPage="5"
        @pageChange="updateDumpsites"
      />
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">
          {{ isEditing ? "Edit Dumpsite" : "Add New Dumpsite" }}
        </h3>
        <form @submit.prevent="handleFormSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Latitude</label>
            <input
              v-model.number="formData.latitude"
              type="number"
              step="any"
              min="-90"
              max="90"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Longitude</label>
            <input
              v-model.number="formData.longitude"
              type="number"
              step="any"
              max="180"
              min="-180"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Capacity</label>
            <input
              v-model.number="formData.capacity"
              type="number"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Status</label>
            <select
              v-model="formData.status"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="isDisabled"
              :class="[
                'w-full py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                isDisabled
                  ? 'bg-gray-400 cursor-not-allowed text-gray-300'
                  : 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600',
              ]"
            >
              {{ isEditing ? "Save Changes" : "Add Dumpsite" }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- ?? ideally, all these should be in their individual component -->
  </div>
</template>

<script setup>
import Pagination from "./pagination.vue";
import api from "../composables/apiService";
import LoadingScreen from "./loadingScreen.vue";
import { useModalStore } from "../stores/useModalStore";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useNotifications } from "../composables/globalAlert";

const dumpsites = ref([]);
const searchQuery = ref("");
const isLoading = ref(false);
const paginatedDumpsites = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const formData = ref({
  latitude: 0,
  longitude: 0,
  capacity: 0,
  status: "active",
});

const modalStore = useModalStore();
const { notify } = useNotifications();

const token = localStorage.getItem("accessToken");

// Event handler function defined separately so it can be referenced in cleanup
const handleItemDeleted = (event) => {
  if (event.detail.source === "dumpsite") {
    dumpsites.value = dumpsites.value.filter(
      (dumpsite) => dumpsite._id !== event.detail.id
    );
  }
};

const updateDumpsites = (items) => {
  paginatedDumpsites.value = items;
};

const getStatusColor = (status) => {
  if (status.toLowerCase() === "active") {
    return "bg-green-200 text-green-600";
  } else {
    return "bg-gray-200 text-gray-600";
  }
};

const handleFetchDumpsites = async () => {
  isLoading.value = true;
  try {
    const res = await api.get("/dumpsites", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dumpsites.value = res.data;
  } catch (error) {
    notify("Failed to load dumpsite", "error");
  } finally {
    isLoading.value = false;
  }
};

const openAddModal = () => {
  isEditing.value = false;
  editingId.value = null;
  formData.value = {
    latitude: 0,
    longitude: 0,
    capacity: 0,
    status: "active",
  };
  showModal.value = true;
};

const openEditModal = (dumpsite) => {
  isEditing.value = true;
  editingId.value = dumpsite._id;
  formData.value = { ...dumpsite };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  formData.value = {
    latitude: 0,
    longitude: 0,
    capacity: 0,
    status: "active",
  };
};

const handleFormSubmit = async () => {
  try {
    if (isEditing.value) {
      await handleEditDumpsite(editingId.value, formData.value);
    } else {
      await handleCreateDumpsite(formData.value);
    }
    closeModal();
    handleFetchDumpsites();
  } catch (error) {
    notify("Form submission failed:", "error");
  }
};

const showDeleteModal = (id, title, type) => {
  modalStore.deleteModal = true;
  modalStore.modalId = id;
  modalStore.modalTitle = title;
  modalStore.source = type;
};

const handleEditDumpsite = async (_id, updatedData) => {
  try {
    isLoading.value = true;
    const res = await api.put(`/dumpsites/${_id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const index = dumpsites.value.findIndex((d) => d._id === _id);
    dumpsites.value[index] = res.data;
    notify("Dumpsite edited successfully", "success");
  } catch (error) {
    notify("Failed to edit dumpsite", "error");
  } finally {
    isLoading.value = false;
  }
};

const handleCreateDumpsite = async () => {
  try {
    isLoading.value = true;
    const res = await api.post(
      "/dumpsites",
      {
        latitude: formData.value.latitude,
        longitude: formData.value.longitude,
        capacity: formData.value.capacity,
        status: formData.value.status,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    notify("Dumpsite created successfully", "success");
    dumpsites.value.push(res.data);
  } catch (error) {
    notify("Failed to create dumpsite", "error");
  } finally {
    isLoading.value = false;
  }
};

const isDisabled = computed(() => {
  return (
    formData.value.latitude === 0 ||
    formData.value.longitude === 0 ||
    formData.value.capacity === 0
  );
});

const handleSearch = () => {
  if (!searchQuery.value) {
    handleFetchDumpsites();
    return;
  }

  const query = searchQuery.value.toLowerCase();
  dumpsites.value = dumpsites.value.filter(
    (dumpsite) =>
      dumpsite.latitude.toString().includes(query) ||
      dumpsite.longitude.toString().includes(query) ||
      dumpsite.capacity.toString().includes(query) ||
      dumpsite.status.toLowerCase().includes(query)
  );
};

const clearSearch = () => {
  searchQuery.value = "";
  handleFetchDumpsites();
};

onMounted(() => {
  handleFetchDumpsites();

  // Add event listener with named handler function
  window.addEventListener("itemDeleted", handleItemDeleted);
});

// clean up the event listener
onUnmounted(() => {
  window.removeEventListener("itemDeleted", handleItemDeleted);
});

// #TODO: refactor code, move modals/pages to individual components, addLoading screen, error etc when im free
</script>
