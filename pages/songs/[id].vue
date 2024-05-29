<template>
  <HeaderSong :song="song" />
  <BaseSongActions />
  <div class="h-full"></div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const songId = route.params.id;
const songStore = useSongStore();

onMounted(() => {
  songStore.getSong(songId);
});

const song = computed(() => songStore.song);
</script>
