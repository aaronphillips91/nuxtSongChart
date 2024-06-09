<template>
  <div class="flex flex-col gap-2 scPage">
    <HeaderSong :song="song" />
    <BaseSectionEdit
      v-for="section in sections"
      :section />
    <BaseSectionAdd />
    <div class="h-full"></div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const songId = route.params.id;
const songStore = useSongStore();
const sectionStore = useSectionStore();

onMounted(() => {
  songStore.getSong(songId);
  sectionStore.getSections(songId);
});

const song = computed(() => songStore.song);
const sections = computed(() => sectionStore.sections);
</script>
