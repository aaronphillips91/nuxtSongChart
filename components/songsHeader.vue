<template>
  <div class="flex flex-col gap-4 my-4 scPage">
    <div class="flex justify-between">
      <h1>Songs</h1>
      <UButton @click="openModal" variant="outline">Add Song</UButton>
    </div>
    <div>
      <UTabs
        :ui="{
          list: {
            background: 'bg-neutral-200 dark:bg-neutral-900',
            marker: {
              background: 'bg-white dark:bg-gray-800',
            },
            tab: {
              inactive: 'text-gray-500 dark:text-gray-500',
            },
          },
        }"
        @change="handleClick"
        :items="items">
      </UTabs>
    </div>
  </div>
</template>

<script setup>
const items = [
  {
    slot: "mySongs",
    label: "My Songs",
  },
  {
    slot: "myLibrary",
    label: "My Library",
  },
  {
    slot: "newReleases",
    label: "New Releases",
  },
  {
    slot: "topSongs",
    label: "Top Songs",
  },
];

const isOpen = ref(false);

const emits = defineEmits(["filterName", "modal"]);

function openModal() {
  emits("modal");
}

function handleClick(index) {
  const item = items[index];
  emits("filterName", item.slot);
}
</script>
