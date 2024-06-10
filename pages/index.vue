<template>
  <img
    class="w-1/2 mx-auto"
    src="/logos/SongChart Logo.svg"
    alt="" />

  <ul ref="parent">
    <li
      v-for="tape in tapes"
      :key="tape"
      class="cursor-pointer select-none cassette">
      {{ tape }}
    </li>
  </ul>
</template>

<script setup>
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
const [parent, tapes] = useDragAndDrop(
  [
    "Aaron Phillips",
    "Greyson Zittle",
    "Joseph Nagel",
    "Ryan Etchberger",
    "Caleb Hanson",
  ],
  { plugins: [animations()] }
);
</script>
