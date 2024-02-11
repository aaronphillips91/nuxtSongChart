<template>
  <SongsHeader @filterName="handleFilter"  />
  <NuxtLink
    :to="`/songs/${song.id}`"
    class="scPage hover:bg-primary-500/10 hover:cursor-pointer flex gap-2 p-2 first-of-type:mt-2 scBorder scBackground scRounded"
    v-for="song in songs">
    <div>
      <img
        class="size-16 rounded-md scBorder"
        :src="song.art"
        alt="" />
    </div>
    <div class="flex flex-col justify-center">
      <h4>{{ song.title }}</h4>
      <p>{{ song.artist }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
  definePageMeta({
    middleware: "auth",
  });
  const client = useSupabaseClient();
  const songs = ref(null);

  const activeFilter = ref("mySongs")

  function handleFilter(filter) {
    activeFilter.value = filter;
    console.log(activeFilter.value)
  }

  async function fetchSongs() {
    const { data, error } = await client.from("songs").select("*");
    if (error) {
      console.error(error);
    } else {
      songs.value = data;
    }
  }

  fetchSongs();
</script>

<style></style>
