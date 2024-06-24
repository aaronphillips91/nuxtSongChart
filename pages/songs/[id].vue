<template>
  <div class="flex flex-col gap-2 scPage">
    <HeaderSong
      :song
      @activeTab="handleActiveTab" />
    <div v-if="activeTab === 'sections'">
      <BaseSectionEdit
        v-for="(section, index) in song.sections"
        :key="index"
        :section
        :song />
      <BaseSectionAdd @click="addSection" />
    </div>
    <div v-if="activeTab === 'arrangements'">Hello Arrangments</div>
    <div v-if="activeTab === 'details'">
      <BaseDetails :song />
    </div>
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
const activeTab = ref("sections");

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

const handleActiveTab = (value) => {
  activeTab.value = value;
};
</script>
