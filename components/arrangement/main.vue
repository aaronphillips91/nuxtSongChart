<template>
  <BaseCard v-if="song">
    <div class="flex flex-col gap-4">
      <div>Song Sections for {{ song.title }}</div>
      <VueDraggable
        @end=""
        v-model="sections"
        :animation="250"
        :group="{ name: 'pills', pull: 'clone', put: false }"
        :sort="true"
        :handle="'.pill'"
        class="flex gap-2">
        <ArrangementPill
          v-for="section in sections"
          :section
          :key="section" />
      </VueDraggable>
    </div>
  </BaseCard>
</template>

<script setup>
import { VueDraggable } from "vue-draggable-plus";
const { song } = defineProps(["song"]);
const chartStore = useChartStore();
onMounted(async () => {
  await chartStore.getSections(song.uuid);
});
const sections = chartStore.sections;
</script>
