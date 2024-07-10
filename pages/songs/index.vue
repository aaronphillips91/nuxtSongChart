<template>
  <div class="flex flex-col gap-2">
    <input
      v-model="searchQuery"
      class="w-full p-4 text-2xl text-center bg-transparent focus:outline-none"
      placeholder="Search..." />
    <baseSongFilter :searchQuery />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const searchQuery = ref("");
</script>
