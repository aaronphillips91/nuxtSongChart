<template>
  <div class="w-full scPage">
    <input class="w-full p-4 text-2xl text-center bg-transparent focus:outline-none" placeholder="Search..." type="text">
  </div>
  <baseSongList/>
  <modalCreateSong/>
</template>

<script setup>
  definePageMeta({
    middleware: "auth",
  });
</script>
