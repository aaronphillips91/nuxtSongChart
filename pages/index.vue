<template>
  <img
    class="w-1/2 mx-auto"
    src="/logos/SongChart Logo.svg"
    alt="" />

  <div>
    <ul
      class="flex flex-col gap-2"
      ref="todoList">
      <li
        v-for="todo in todos"
        :key="todo"
        class="flex items-center justify-between w-1/4 p-4 rounded-lg bg-white/5">
        <button class="hover:cursor-grab active:cursor-grabbing handle">
          <UIcon name="i-heroicons-bars-2" />
        </button>
        {{ todo }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";

const todoItems = ["Aaron Phillips", "Greyson Zittle", "Joseph Nagel"];

const [todoList, todos] = useDragAndDrop(todoItems, {
  group: "todoList",
  dragHandle: ".handle",
  plugins: [animations()],
});
</script>
