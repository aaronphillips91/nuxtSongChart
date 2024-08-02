<template>
  <div
    v-if="song"
    class="flex flex-col w-screen gap-2 px-2 pt-2 sm:pt-0 xl:px-0 max-w-7xl">
    <HeaderSong
      :song
      @activeTab="handleActiveTab" />
    <SongToolbar :song />
    <!-- Sections -->
    <SectionsMain
      v-if="activeTab === 'sections'"
      :song />
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
            @click="handleNavigation(arrangement)"
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

const handleNavigation = async (arrangement) => {
  await chartStore.getArrangement(arrangement.uuid);
  navigateTo(`/arrangement/${arrangement.uuid}`);
};

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
