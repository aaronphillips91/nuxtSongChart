<template>
  <div>
    <div
      v-for="song in songs"
      :key="song.title"
      @click="() => $emit('clickSong', song.uuid)"
      class="flex items-center gap-2 p-2 transition-all duration-200 scBorder scRounded bg-white/5 hover:bg-white/10 hover:cursor-pointer">
      <img class="rounded size-16" :src="song.art" alt="" />
      <div>
        <div>{{ song.title }}</div>
        <div class="text-xs">{{ song.artist }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  songs: Array,
});
</script>

<style></style>
