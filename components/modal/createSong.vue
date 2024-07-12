<template>
  <UModal v-model="modal">
    <div class="flex flex-col gap-4 p-4">
      <div class="flex items-center justify-between">
        <h4>Create Song</h4>
        <img
          class="size-12"
          src="/icons/SongChartIcon.svg"
          alt="" />
      </div>
      <UDivider />
      <BasePicUploader
        @file-selected="handleFile"
        label="Album Art"
        intent="album" />
      <BaseInput
        label="Song title"
        v-model="song.title.value" />
      <div class="flex w-full gap-4">
        <BaseInput
          class="w-full"
          label="Album name"
          v-model="song.album.value" />
        <BaseInput
          class="w-full"
          label="Artist name"
          v-model="song.artist.value" />
      </div>
      <div class="flex w-full gap-4">
        <BaseInput
          class="w-full"
          label="Tempo"
          v-model="song.tempo.value" />
        <BaseInput
          class="w-full"
          label="Original key"
          v-model="song.original_key.value" />
      </div>
      <div class="flex gap-4 ml-auto">
        <UButton
          @click="closeModal"
          variant="ghost"
          label="Cancel" />
        <UButton
          @click="createSong"
          label="Create song" />
      </div>
    </div>
  </UModal>
</template>

<script setup>
const chartStore = useChartStore();
const modal = computed(() => chartStore.newSongModal);

const song = {
  title: ref(""),
  artist: ref(""),
  album: ref(""),
  art: ref(""),
  tempo: ref(""),
  creator_id: ref(""),
  original_key: ref(""),
  isPublic: ref(false),
  library: ref([]),
  collaborator: ref([]),
};

const artFile = ref(null);

const handleFile = (file) => {
  console.log(file.name);
  artFile.value = file;
};

const createSong = async () => {
  try {
    const imageUrl = await chartStore.uploadArt(artFile.value);
    console.log("Art uploaded:", imageUrl);
    song.art.value = imageUrl;
    const newSong = {
      title: song.title.value,
      artist: song.artist.value,
      album: song.album.value,
      tempo: song.tempo.value,
      original_key: song.original_key.value,
      art: song.art.value,
    };
    chartStore.createSong(newSong);
  } catch (error) {
    console.error("Error adding song:", error.message);
  }
};

const closeModal = () => {
  (song.title.value = ""),
    (song.artist.value = ""),
    (song.album.value = ""),
    (song.tempo.value = ""),
    (song.original_key.value = ""),
    chartStore.closeNewSongModal();
};
</script>
