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
    <li id="no-drag">I am NOT draggable</li>
  </ul>
</template>

<script setup>
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
const [parent, tapes] = useDragAndDrop(
  [
    "Aaron Phillips",
    "Greyson Zittle",
    "Joseph Nagel",
    "Ryan Etchberger",
    "Caleb Hanson",
  ],
  {
    draggable: (el) => {
      return el.id !== "no-drag";
    },
  }
);
</script>
