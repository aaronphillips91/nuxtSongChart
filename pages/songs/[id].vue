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
      <VueDraggable
        @start="onStart"
        @end="onEnd"
        v-model="sections"
        :animation="150"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :sort="true"
        class="flex flex-col gap-2">
        <BaseSectionEdit
          v-for="(section, index) in sections"
          :key="index"
          :section
          :song />
      </VueDraggable>
      <BaseSectionAdd @click="chartStore.createSection()" />
    </div>
    <!-- Arrangements -->
    <div
      class="flex flex-col gap-2"
      v-if="activeTab === 'arrangements'">
      <ArrangementMain :song />
      <div class="flex flex-col gap-2">
        <VueDraggable
          @start="onStart"
          @end="onEnd"
          v-model="arrangements"
          :animation="150"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :sort="true"
          class="flex flex-col gap-2">
          <ArrangementSub
            v-for="(arrangement, index) in arrangements"
            :key="index"
            :arrangement />
        </VueDraggable>
        <ArrangementAdd @click="chartStore.createArrangment()" />
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
import { VueDraggable } from "vue-draggable-plus";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const songId = route.params.id;
const chartStore = useChartStore();
const activeTab = ref("sections");

onMounted(() => {
  chartStore.getSong(songId);
  chartStore.getSections(songId);
  chartStore.getArrangements(songId);
});

const song = computed(() => chartStore.song);
const sections = computed(() => chartStore.sections);
const arrangements = computed(() => chartStore.arrangements);

const handleActiveTab = (value) => {
  activeTab.value = value;
};
</script>
