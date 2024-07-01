<template>
  <BaseCard class="flex-col">
    <div>BASIC INFO</div>
    <div class="flex gap-2">
      <img
        :src="song.art"
        class="rounded-lg size-48" />
      <div class="flex flex-col gap-2">
        <div>Song Title: {{ song.title }}</div>
        <div>Album: {{ song.album }}</div>
        <div>Artist: {{ song.artist }}</div>
      </div>
    </div>
    <UDivider class="my-4" />
    <div>MUSICAL INFO</div>
    <div class="flex gap-4">
      <div>Song Tempo: {{ song.tempo }} BPM</div>
      <div>Original Key: {{ song.original_key }}</div>
    </div>
  </BaseCard>
</template>

<script setup>
const { song } = defineProps(["song"]);
</script>
