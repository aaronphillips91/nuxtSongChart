<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <img
      class="w-1/2 mx-auto"
      src="/logos/SongChart Logo.svg"
      alt="" />
    <div
      v-if="!user"
      class="flex gap-4">
      <UButton
        to="/login"
        label="Login" />
      <UButton
        to="/register"
        label="Register" />
    </div>
    <div v-if="user">
      <UButton
        to="/songs"
        label="Dashboard" />
    </div>
    <div>
      <VueDraggable
        @start="onStart"
        @end="onEnd"
        v-model="list1"
        :animation="150"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :sort="true"
        class="flex gap-2 p-4 rounded w-300px bg-gray-500/5">
        <ArrangementPill
          v-for="item in list1"
          :key="item.id"
          :section="item" />
      </VueDraggable>
    </div>
  </div>
</template>

<script setup>
import { VueDraggable } from "vue-draggable-plus";

//set layout to landing
definePageMeta({
  layout: "landing",
});

const user = useSupabaseUser();

const list1 = ref([
  {
    name: "Intro",
    id: "926",
  },
  {
    name: "Verse",
    id: "218",
  },
  {
    name: "Chorus",
    id: "316",
  },
  {
    name: "Bridge",
    id: "420",
  },
]);
</script>
