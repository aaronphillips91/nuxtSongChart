<template>
  <SongsHeader
    @modal="openModal"
    @filterName="handleFilter" />
  <NuxtLink
    :to="`/songs/${song.id}`"
    class="flex gap-2 p-2 scPage hover:bg-gradient-to-br from-primary-500/50 to-primary-500/0 hover:cursor-pointer first-of-type:mt-2 scBorder scBackground scRounded"
    v-for="song in songs">
    <div>
      <img
        class="rounded-md aspect-square size-16 scBorder"
        :src="song.art"
        alt="" />
    </div>
    <div class="flex flex-col justify-center">
      <h4 class="line-clamp-1">{{ song.title }}</h4>
      <p>{{ song.artist }}</p>
    </div>
  </NuxtLink>

  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="flex justify-between h-8">
          <h3>New Song</h3>
          <UButton
            @click="isOpen = false"
            icon="i-heroicons-x-mark"
            size="sm"
            color="primary"
            square
            variant="solid" />
        </div>
      </template>

      <div class="">
        <div class="">
          <label for="newTitle">Song Title</label>
          <UInput
            v-model="newTitle"
            type="text"
            required />
        </div>
        <div class="">
          <label for="newArtist">Artist Name</label>
          <UInput
            v-model="newArtist"
            type="text"
            required />
        </div>
        <div class="">
          <label for="newAlbum">Album</label>
          <UInput
            v-model="newAlbum"
            type="text"
            required />
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup>
  definePageMeta({
    middleware: "auth",
  });
  const client = useSupabaseClient();
  const songs = ref(null);

  const isOpen = ref(false);

  function openModal() {
    isOpen.value = true;
  }

  const activeFilter = ref("mySongs");

  function handleFilter(filter) {
    activeFilter.value = filter;
    console.log(activeFilter.value);
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
