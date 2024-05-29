<template>
  <HeaderSong :song="song"/>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const songStore = useSongStore();
const song = computed(() => songStore.song)
</script>
