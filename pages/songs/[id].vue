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
        v-for="(section, index) in sections"
        :key="index"
        :section
        :song />
      <BaseSectionAdd @click="chartStore.createSection()" />
    </div>
    <!-- Arrangements -->
    <div
      class="flex flex-col gap-2"
      v-if="activeTab === 'arrangements'">
      <ArrangementMain :song />
      <div class="flex flex-col gap-2">
        <ArrangementSub
          v-for="(arrangement, index) in arrangements"
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
const chartStore = useChartStore();
const activeTab = ref("sections");

onMounted(() => {
  chartStore.getSong(songId);
});

const song = computed(() => chartStore.song);
const sections = computed(() => chartStore.sections);
const arrangements = computed(() => chartStore.arrangements);

const addSection = () => {
  const newSection = {
    id: uuidv4(),
    name: "New Section",
    content: "",
  };
  songStore.createSection(newSection);
};

const addArrangement = () => {
  console.log("adding arrangement");
  const newArrangement = {
    id: uuidv4(),
    name: "New Arrangement",
    sections: [],
  };
  songStore.createArrangement(newArrangement);
  console.log("new arrangement added");
};

const handleActiveTab = (value) => {
  activeTab.value = value;
};
</script>
