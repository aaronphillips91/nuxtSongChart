<template>
  <VueDraggable
    @end="updateSectionOrder"
    v-model="localSections"
    :animation="250"
    :group="{ name: 'sections', pull: 'clone', put: false }"
    :sort="true"
    :handle="'.handle'"
    class="flex flex-col gap-2">
    <SectionsCardDesktop
      v-if="!isMobile"
      v-for="section in localSections"
      :key="section"
      :section
      :song />
    <SectionsCardMobile
      v-if="isMobile"
      v-for="section in localSections"
      :key="section"
      :section
      :song />
  </VueDraggable>
  <BaseCard
    @click="createSection"
    class="!bg-transparent mb-20 justify-center !p-12 hover:!bg-zinc-900 transition-all duration-200 select-none hover:cursor-pointer border-dashed">
    Add Section
  </BaseCard>
</template>

<script setup>
import { VueDraggable } from "vue-draggable-plus";
const chartStore = useChartStore();
const { song } = defineProps(["song"]);
const localSections = ref([]);

const screenWidth = ref(window.innerWidth);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const isMobile = computed(() => screenWidth.value < 768);

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
