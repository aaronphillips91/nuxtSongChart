<template>
  <BaseCard class="items-center gap-2">
    <img class="rounded size-32" :src="song.art" alt="" />
    <div class="flex flex-col gap-2">
      <h4>{{ song.title }}</h4>
      <p>{{ song.artist }}</p>
    </div>
    <div class="ml-auto mr-2">
      <div
        class="flex items-center justify-end gap-2 text-zinc-300"
        v-for="stat in stats">
        <UIcon :name="stat.icon" />
        <p>{{ stat.name }}</p>
        <p>{{ stat.count }}</p>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
const props = defineProps({
  song: Object,
});

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
