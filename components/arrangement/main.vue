<template>
  <BaseCard>
    <div class="flex flex-col gap-4">
      <div>Song Sections for {{ song.title }}</div>
      <div class="flex gap-2">
        <ArrangementPill
          v-for="section in song.sections"
          :section="section" />
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
const { song } = defineProps(["song"]);
</script>
