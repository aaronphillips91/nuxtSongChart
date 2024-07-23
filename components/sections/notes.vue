<template>
  <div class="flex gap-2">
    <UDropdown v-for="chord in primaryChords">
      <UButton
        size="2xs"
        :label="chord" />
    </UDropdown>
  </div>
</template>

<script setup>
import chords from "~/assets/json/chords.json";
const { song } = defineProps(["song"]);

const primaryChords = ref(
  Object.values(chords[song.original_key]).map((chordArray) => chordArray[0])
);

//watch for changes to song and update chordOptions
watch(
  () => song.original_key,
  () => {
    primaryChords.value = Object.values(chords[song.original_key]).map(
      (chordArray) => chordArray[0]
    );
  }
);
</script>
