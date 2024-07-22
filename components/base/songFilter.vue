<template>
  <div
    class="flex max-h-[calc(100dvh-138px)] overflow-scroll no-scrollbar flex-col p-2 border rounded-lg max-w-7xl mx-auto w-full scBackground border-zinc-300 dark:border-zinc-700">
    <div class="flex w-full gap-2">
      <UTabs
        class="w-full"
        :items
        @change="onChange" />
      <UButton
        @click="openModal"
        class="h-10"
        variant="outline">
        Add Song
      </UButton>
    </div>
    <baseSongList
      :songs="filteredSongs"
      @clickSong="goToSong" />
  </div>
  <modalCreateSong />
</template>

<script setup>
const songStore = useSongStore();
const profileStore = useProfileStore();
const profile = profileStore.profile;

onMounted(() => {
  songStore.getSongs();
});

const songs = computed(() => songStore.songs);

const props = defineProps({
  searchQuery: {
    type: String,
    default: "",
  },
});

const openModal = () => {
  songStore.openNewSongModal();
};

const goToSong = async (songId) => {
  await songStore.getSong(songId);
  navigateTo(`/songs/${songId}`);
};

const items = [
  { slot: "mySongs", label: "My Songs" },
  { slot: "sharedSongs", label: "Shared With Me" },
];

const activeTab = ref("mySongs");

function onChange(index) {
  const item = items[index];
  activeTab.value = item.slot;
}

const mySongs = computed(() =>
  songs.value.filter((song) => song.creator_id === profile.uuid)
);

const sharedSongs = computed(() =>
  songs.value.filter((song) => song.collaborator.includes(profile.uuid))
);

const topSongs = computed(() => songs.value.filter((song) => song.public));

const newReleases = computed(() => {
  const now = new Date();
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(now.getMonth() - 2);

  return songs.value.filter((song) => {
    const createdAt = new Date(song.created_at);
    return createdAt >= twoMonthsAgo && createdAt <= now;
  });
});

const filterSongs = (songList) => {
  return songList.filter(
    (song) =>
      song.title.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
};

const filteredSongs = computed(() => {
  let songList;
  if (activeTab.value === "mySongs") {
    songList = mySongs.value;
  } else if (activeTab.value === "sharedSongs") {
    songList = topSongs.value;
  }
  return filterSongs(songList);
});
</script>
