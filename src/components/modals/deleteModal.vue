<template>
  <div
    v-if="showDeleteModal"
    @click.self="handleCancel"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 class="text-lg font-bold mb-4">Confirm Deletion</h3>
      <p class="mb-4">
        Are you sure you want to delete
        <span v-if="!modalStore.modalTitle">
          this
          <span class="font-bold">{{ modalStore.source }}</span>
        </span>
        <span v-else class="font-bold">{{ modalStore.modalTitle }}</span
        >?
      </p>

      <div class="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          @click="handleCancel"
          :disabled="isLoading"
          class="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          @click="handleDelete"
          :disabled="isLoading"
          class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 disabled:opacity-50 flex items-center"
        >
          <span v-if="isLoading" class="mr-2">
            <svg
              class="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
          {{ isLoading ? "Deleting..." : "Delete" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import api from "../../composables/apiService";
import { useNotifications } from "../../composables/globalAlert";
import { useModalStore } from "../../stores/useModalStore";

const isLoading = ref(false);
const modalStore = useModalStore();
const emit = defineEmits(["deleted"]);
const { notify } = useNotifications();
const showDeleteModal = computed(() => modalStore.deleteModal);

const token = localStorage.getItem("accessToken");

const handleCancel = () => {
  if (isLoading.value) return;
  modalStore.deleteModal = false;
  modalStore.modalId = null;
  modalStore.modalTitle = null;
  modalStore.source = null;
};

const getDeleteEndpoint = () => {
  const endpoints = {
    dumpsite: `/dumpsites/${modalStore.modalId}`,
    mill: `/mills/${modalStore.modalId}`,
  };
  return endpoints[modalStore.source];
};

const handleDelete = async () => {
  isLoading.value = true;

  if (modalStore.source === "mill") {
    notify("Logic not implemented", "info");
    isLoading.value = false;
    modalStore.deleteModal = false;
    return;
  }

  const endpoint = getDeleteEndpoint();

  try {
    await api.delete(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Emit an event with the source type so components can handle their own updates
    window.dispatchEvent(
      new CustomEvent("itemDeleted", {
        detail: { id: modalStore.modalId, source: modalStore.source },
      })
    );
    notify(`${modalStore.source} deleted successfully`, "success");
    // emit("deleted", modalStore.modalId);
    modalStore.deleteModal = false;
  } catch (error) {
    const message =
      error.response?.data?.message || `Failed to delete ${modalStore.source}`;
    notify(message, "error");
  } finally {
    isLoading.value = false;
  }
};
</script>
