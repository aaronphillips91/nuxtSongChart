<template>
  <div
    v-if="visible"
    class="absolute z-50 border rounded-lg bg-zinc-800 border-zinc-700 max-w-96"
    :style="{ top: `${position.top}px`, left: `${position.left}px` }">
    <ul class="flex flex-wrap gap-1">
      <li
        class="w-full p-1 border rounded-lg"
        v-for="(variations, chord) in chordsInKey"
        :key="chord">
        <strong>{{ chord }}</strong>
        <ul class="flex gap-4">
          <li
            class="p-1 px-4 border rounded-lg hover:cursor-pointer hover:bg-white/5"
            v-for="variation in variations"
            :key="variation"
            @click="selectChord(variation)">
            {{ variation }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import chords from "/assets/json/chords.json";

const { songKey, visible, position } = defineProps([
  "songKey",
  "visible",
  "position",
]);

console.log(songKey);

const chordsInKey = computed(() => chords[songKey] || ["ERROR"]);

const emit = defineEmits(["select"]);

const selectChord = (chord) => {
  emit("select", chord);
};
</script>

<style></style>
