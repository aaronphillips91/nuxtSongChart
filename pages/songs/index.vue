<template>
  <div class="flex flex-col w-full gap-2">
    <div class="w-full mx-2 max-w-7xl xl:mx-auto">
      <input
        v-model="searchQuery"
        class="w-full p-4 text-2xl text-center bg-transparent focus:outline-none"
        placeholder="Search..."
        type="text" />
    </div>
    <baseSongFilter :searchQuery="searchQuery" />
    <modalCreateSong />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const searchQuery = ref("");
</script>
