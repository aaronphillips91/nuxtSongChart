<template>
  <div class="flex items-center p-4 border rounded-lg border-zinc-700 scBackground scPage mt-4 !h-fit">
    <img class="rounded size-24" :src="song.art" alt="">
    <h4>{{ song.title }}</h4>
  </div>
</template>

<script setup>
const props = defineProps({
  song: Object,
})
</script>