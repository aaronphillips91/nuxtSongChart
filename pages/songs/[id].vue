<template>
  <div class="flex flex-col gap-2 scPage">
    <HeaderSong :song="song" />
    <BaseSectionEdit
      v-for="(section, index) in song.sections"
      :key="index"
      :section="section" />
    <BaseSectionAdd @click="addSection" />
    <div class="h-full"></div>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";

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

const addSection = () => {
  const newSection = {
    id: uuidv4(),
    name: "New Section",
    content: "",
  };
  songStore.addSection(newSection);
};
</script>
