<template>
  <div class="scPage my-4 flex flex-col gap-4">
    <div class="flex justify-between">
      <h1>Songs</h1>
      <UButton>Add Song</UButton>
    </div>
    <div>
      <UTabs :ui="{
        list: {
          background: 'bg-neutral-200 dark:bg-neutral-800'
        }
      }" @change="handleClick" :items="items">

      </UTabs>
  </div>
  </div>
</template>

<script setup>
const items = [
  {
    slot: "mySongs",
    label: "My Songs"
  },
  {
    slot: "myLibrary",
    label: "My Library"
  },
  {
    slot: "newReleases",
    label: "New Releases"
  },
  {
    slot: "topSongs",
    label: "Top Songs"
  },
]

const emits = defineEmits(['filterName'])

function handleClick(index) {
  const item = items[index]
  emits('filterName', item.slot)
}
</script>

<style>

</style>