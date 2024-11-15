<template>
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
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["pageChange"]);
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(props.items.length / props.itemsPerPage)
);

// Function to calculate and emit paginated items
const updatePaginatedItems = () => {
  const start = (currentPage.value - 1) * props.itemsPerPage;
  const paginatedItems = props.items.slice(start, start + props.itemsPerPage);
  emit("pageChange", paginatedItems);
};

// Watch for changes in currentPage
watch(currentPage, () => {
  updatePaginatedItems();
});

// Watch for changes in items array
watch(
  () => props.items,
  () => {
    // Reset to first page when items change
    currentPage.value = 1;
    updatePaginatedItems();
  },
  { deep: true }
);

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Initialize pagination when component mounts
onMounted(() => {
  updatePaginatedItems();
});
</script>
