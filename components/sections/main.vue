<template>
  <VueDraggable
    @end="updateSectionOrder"
    v-model="localSections"
    :animation="250"
    :group="{ name: 'sections', pull: 'clone', put: false }"
    :sort="true"
    :handle="'.handle'"
    class="flex flex-col gap-2">
    <SectionsCard
      :section
      :song
      :key="section"
      v-for="section in localSections" />
  </VueDraggable>
  <BaseCard
    @click="createSection"
    class="!bg-transparent justify-center !p-12 hover:!bg-zinc-900 transition-all duration-200 select-none hover:cursor-pointer border-dashed">
    Add Section
  </BaseCard>
</template>

<script setup>
import { VueDraggable } from "vue-draggable-plus";
const chartStore = useChartStore();
const { song } = defineProps(["song"]);
const localSections = ref([]);

onMounted(async () => {
  await chartStore.getSections(song.uuid);
  localSections.value = [...chartStore.sections];
});

const updateSectionOrder = () => {
  chartStore.updateSectionOrder(localSections.value);
};

onUnmounted(() => {
  chartStore.sections = [];
});

const refreshSections = async () => {
  await chartStore.getSections(song.uuid);
  localSections.value = [...chartStore.sections];
};

//watch the chartStore.sections array and if it changes then update localSections
watch(
  () => chartStore.sections,
  (newSections) => {
    localSections.value = [...newSections];
  }
);

//watch the localSections array and if it changes then updateSectionOrder
watch(
  () => localSections.value.length,
  () => {
    updateSectionOrder();
  }
);

const createSection = () => {
  chartStore.createSection();
  refreshSections();
};
</script>
