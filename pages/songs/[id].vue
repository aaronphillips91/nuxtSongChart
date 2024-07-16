<template>
  <div
    v-if="song"
    class="flex flex-col gap-2 scPage">
    <HeaderSong
      :song
      @activeTab="handleActiveTab" />
    <!-- Sections -->
    <SectionsMain
      v-if="activeTab === 'sections'"
      :song />
    <div
      class="flex flex-col gap-2"
      v-if="activeTab === 'newSections'">
      <VueDraggable
        @end="updateSectionOrder"
        v-model="localSections"
        :animation="250"
        :group="{ name: 'sections', pull: 'clone', put: false }"
        :sort="true"
        class="flex flex-col gap-2">
        <BaseSectionEdit
          v-for="(section, order) in localSections"
          :key="order"
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
          @end="updateArrangementOrder"
          v-model="localArrangements"
          :animation="150"
          :group="{ name: 'arrangements', pull: 'clone', put: false }"
          :sort="true"
          class="flex flex-col gap-2">
          <ArrangementSub
            v-for="(arrangement, index) in localArrangements"
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
import { VueDraggable } from "vue-draggable-plus";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const songId = route.params.id;
const chartStore = useChartStore();
const activeTab = ref("sections");
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await chartStore.getSong(songId);
  await chartStore.getSections(songId);
  await chartStore.getArrangements(songId);
  isLoading.value = false;
});

onUnmounted(() => {
  chartStore.song = null;
  chartStore.sections = [];
  chartStore.arrangements = [];
});

const localSections = ref([...chartStore.sections]);
const localArrangements = ref([...chartStore.arrangements]);

watch(
  () => chartStore.sections,
  (newSections) => {
    localSections.value = [...newSections];
  }
);

watch(
  () => chartStore.arrangements,
  (newArrangements) => {
    localArrangements.value = [...newArrangements];
  }
);

const song = computed(() => chartStore.song);

const handleActiveTab = (value) => {
  activeTab.value = value;
};

const updateSectionOrder = () => {
  chartStore.updateSectionOrder(localSections.value);
};

const updateArrangementOrder = () => {
  chartStore.updateArrangementOrder(localArrangements.value);
};
</script>
