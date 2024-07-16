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
      :key="section.order"
      v-for="section in localSections" />
  </VueDraggable>
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
</script>
