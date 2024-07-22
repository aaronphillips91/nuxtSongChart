<template>
  <div class="flex flex-col w-screen gap-2 max-w-7xl">
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
