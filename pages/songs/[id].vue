<template>
  <div
    v-if="song"
    class="flex flex-col gap-2 scPage">
    <HeaderSong
      :song
      @activeTab="handleActiveTab" />
    <!-- Sections -->
    <div
      class="flex flex-col gap-2"
      v-if="activeTab === 'sections'">
      <BaseSectionEdit
        v-for="(section, index) in song.sections"
        :key="index"
        :section
        :song />
      <BaseSectionAdd @click="addSection" />
    </div>
    <!-- Arrangements -->
    <div
      class="flex flex-col gap-2"
      v-if="activeTab === 'arrangements'">
      <ArrangementMain :song />
      <div class="flex flex-col gap-2">
        <ArrangementSub
          v-for="(arrangement, index) in song.arrangements"
          :key="index"
          :arrangement />
        <ArrangementAdd @click="addArrangement" />
      </div>
    </div>
    <!-- Details -->
    <div v-if="activeTab === 'details'">
      <BaseDetails :song />
    </div>
    <div class="h-full"></div>
  </div>
  <div v-else>
    <UProgress animation="carousel" />
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

const addArrangement = () => {
  console.log("adding arrangement");
  const newArrangement = {
    id: uuidv4(),
    name: "New Arrangement",
    sections: [],
  };
  songStore.addArrangement(newArrangement);
  console.log("new arrangement added");
};

const handleActiveTab = (value) => {
  activeTab.value = value;
};
</script>
