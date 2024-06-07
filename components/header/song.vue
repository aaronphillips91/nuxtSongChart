<template>
  <div class="flex flex-col !w-full gap-2">
    <BaseCard class="flex flex-col items-center gap-2">
      <div class="flex flex-row items-center w-full gap-2">
        <img
          class="rounded size-32"
          :src="song.art"
          alt="" />
        <div class="flex flex-col gap-2">
          <h4>{{ song.title }}</h4>
          <p>{{ song.artist }}</p>
        </div>
      </div>
      <UTabs
        class="w-full mb-0"
        :items
        @change="onChange"
        :ui="{
          wrapper: 'relateive space-y-0',
          list: {
            tab: {
              size: 'text-xs',
            },
          },
        }" />
    </BaseCard>
    <BaseSectionEdit v-for="n in 4" />
  </div>
</template>

<script setup>
const props = defineProps({
  song: Object,
});

const activeTab = ref("sections");

const items = [
  { slot: "sections", label: "Sections" },
  { slot: "arrangements", label: "Arrangements" },
  { slot: "details", label: "Song Details" },
];

function onChange(index) {
  const item = items[index];
  activeTab.value = item.slot;
}

const stats = [
  {
    icon: "i-heroicons-square-3-stack-3d-solid",
    name: "Sections: ",
    count: "7",
  },
  {
    icon: "i-heroicons-rectangle-stack-solid",
    name: "Arrangements: ",
    count: "3",
  },
  {
    icon: "i-heroicons-users-solid",
    name: "Collaborators: ",
    count: "2",
  },
  {
    icon: "i-heroicons-queue-list-solid",
    name: "Library Adds: ",
    count: "29",
  },
];
</script>
