<template>
  <div class="flex flex-col gap-2">
    <HeaderArrangement :song />
    <ArrangementMain :song />
    <ArrangementSub :arrangement />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
const route = useRoute();
const arrangementId = route.params.id;
const chartStore = useChartStore();

onMounted(async () => {
  await chartStore.getArrangement(arrangementId);
  await chartStore.getSong(chartStore.arrangement.song);
});

onUnmounted(() => {
  chartStore.song = null;
  chartStore.sections = [];
  chartStore.arrangements = [];
  chartStore.arrangement = null;
});

const arrangement = chartStore.arrangement;
const song = chartStore.song;
</script>

<style></style>
