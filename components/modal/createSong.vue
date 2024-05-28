<template>
  <UModal v-model="modal">
    <div class="flex flex-col gap-4 p-4">
      <div class="flex items-center justify-between">
        <h4>Create Song</h4>
        <img class="size-12" src="/static/icons/SongChartIcon.svg" alt="">
      </div>
      <UDivider/>
      <BasePicUploader label="Album Art" intent="album"/>
      <BaseInput label="Song title" v-model="title"/>
      <div class="flex w-full gap-4">
        <BaseInput class="w-full" label="Album name" v-model="album"/>
        <BaseInput class="w-full" label="Artist name" v-model="artist"/>
      </div>
      <div class="flex w-full gap-4">
        <BaseInput class="w-full" label="Tempo" v-model="tempo"/>
        <BaseInput class="w-full" label="Original key" v-model="original_key"/>
      </div>
      <div class="flex gap-4 ml-auto">
        <UButton @click="closeModal" variant="ghost" label="Cancel" />
        <UButton @click="createSong" label="Create song"/>
      </div>
    </div>
  </UModal>
</template>

<script setup>
  const songStore = useSongStore();
  const modal = computed(() => songStore.newSongModal);

  const closeModal = () => {
    title.value = '',
    artist.value = '',
    album.value = '',
    tempo.value = '',
    original_key.value = '',
    songStore.closeNewSongModal();
  }

  const createSong = () => {
    const newSong = {
      title: title.value,
      artist: artist.value,
      album: album.value,
      tempo: tempo.value,
      original_key: original_key.value
    };
    songStore.createSong(newSong);
  }

  const title = ref('');
  const artist = ref('');
  const album = ref('');
  const art = ref('');
  const tempo = ref('');
  const creator_id = ref('');
  const original_key = ref('');
  const isPublic = ref('');
  const library = ref([]);
  const collaborator= ref([]);
</script>