<template>
  <div class="scPage my-4 flex flex-col gap-2">
    <div class="flex justify-between">
      <h1>Songs</h1>
      <UButton>Add Song</UButton>
    </div>
    <div>
      <UTabs :items="items">

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
</script>

<style>

</style>