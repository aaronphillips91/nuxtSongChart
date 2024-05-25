<template>
  <div class="flex max-h-[calc(100dvh-138px)] overflow-scroll flex-col p-2 border rounded-lg scPage scBackground border-zinc-700">
    <div class="flex w-full gap-2">
      <UTabs class="w-full" :items="items" @change="onChange"></UTabs>
      <UButton class="h-10" variant="outline" >Add Song</UButton>
    </div>
    <div v-if="activeTab === 'mySongs'">
      <div class="flex items-center gap-2 p-2 scBorder scRounded bg-white/5" v-for="song in mySongs" :key="song.title">
        <img class="rounded size-24" :src="song.art" alt="">
        <div>
          <div>{{ song.title }}</div>
          <div class="text-xs">{{ song.artist }}</div>
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'topSongs'">
      <div class="flex items-center gap-2 p-2 scBorder scRounded bg-white/5" v-for="song in topSongs" :key="song.title">
        <img class="rounded size-24" :src="song.art" alt="">
        <div>
          <div>{{ song.title }}</div>
          <div class="text-xs">{{ song.artist }}</div>
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'newReleases'">
      <div class="flex items-center gap-2 p-2 scBorder scRounded bg-white/5" v-for="song in newReleases" :key="song.title">
        <img class="rounded size-24" :src="song.art" alt="">
        <div>
          <div>{{ song.title }}</div>
          <div class="text-xs">{{ song.artist }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const items = [
  { slot: 'mySongs', label: 'My Songs' },
  { slot: 'topSongs', label: 'Top Songs' },
  { slot: 'newReleases', label: 'New Releases' }
];

const songs = [
  {
    title: 'Praise',
    artist: 'Elevation Worship',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/7566.jpg',
    creator: '2c1162cd-102c-47dc-9a10-ea8d88df6c5a',
    public: false,
    releaseMonth: '5',
    releaseYear: '2024'
  },
  {
    title: 'The Joy',
    artist: 'The Belonging Co',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/7817.jpg',
    creator: '',
    public: true,
    releaseMonth: '4',
    releaseYear: '2024'
  },
  {
    title: 'Goodness of God',
    artist: 'Bethel Music',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/2171.jpg',
    creator: '2c1162cd-102c-47dc-9a10-ea8d88df6c5a',
    public: true,
    releaseMonth: '5',
    releaseYear: '2021'
  },
  {
    title: 'Firm Foundation',
    artist: 'Cody Carnes',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/5551.jpg',
    creator: '',
    public: false,
    releaseMonth: '5',
    releaseYear: '2019'
  },
  {
    title: 'Way Maker',
    artist: 'Leeland',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/5566.jpg',
    creator: '3a2162cd-102c-47dc-9a10-ea8d88df6c6b',
    public: true,
    releaseMonth: '3',
    releaseYear: '2024'
  },
  {
    title: 'Graves into Gardens',
    artist: 'Elevation Worship',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/5617.jpg',
    creator: '2c1162cd-102c-47dc-9a10-ea8d88df6c5a',
    public: true,
    releaseMonth: '1',
    releaseYear: '2023'
  },
  {
    title: 'Another in the Fire',
    artist: 'Hillsong UNITED',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/5621.jpg',
    creator: '1c1162cd-102c-47dc-9a10-ea8d88df6c5b',
    public: false,
    releaseMonth: '12',
    releaseYear: '2022'
  },
  {
    title: 'See a Victory',
    artist: 'Elevation Worship',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/5632.jpg',
    creator: '2c1162cd-102c-47dc-9a10-ea8d88df6c5a',
    public: true,
    releaseMonth: '8',
    releaseYear: '2021'
  },
  {
    title: 'Oceans (Where Feet May Fail)',
    artist: 'Hillsong UNITED',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/5644.jpg',
    creator: '1c1162cd-102c-47dc-9a10-ea8d88df6c5b',
    public: true,
    releaseMonth: '7',
    releaseYear: '2020'
  },
  {
    title: 'Holy Spirit',
    artist: 'Francesca Battistelli',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/5655.jpg',
    creator: '4c1162cd-102c-47dc-9a10-ea8d88df6c5c',
    public: false,
    releaseMonth: '6',
    releaseYear: '2020'
  },
  {
    title: 'Reckless Love',
    artist: 'Cory Asbury',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/5666.jpg',
    creator: '5c1162cd-102c-47dc-9a10-ea8d88df6c5d',
    public: true,
    releaseMonth: '2',
    releaseYear: '2020'
  },
  {
    title: 'Build My Life',
    artist: 'Pat Barrett',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/5677.jpg',
    creator: '2c1162cd-102c-47dc-9a10-ea8d88df6c5a',
    public: false,
    releaseMonth: '9',
    releaseYear: '2019'
  },
  {
    title: '10,000 Reasons (Bless the Lord)',
    artist: 'Matt Redman',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/5688.jpg',
    creator: '6c1162cd-102c-47dc-9a10-ea8d88df6c5e',
    public: true,
    releaseMonth: '11',
    releaseYear: '2018'
  },
  {
    title: 'Who You Say I Am',
    artist: 'Hillsong Worship',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/5699.jpg',
    creator: '1c1162cd-102c-47dc-9a10-ea8d88df6c5b',
    public: false,
    releaseMonth: '5',
    releaseYear: '2018'
  },
  {
    title: 'Living Hope',
    artist: 'Phil Wickham',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/5700.jpg',
    creator: '7c1162cd-102c-47dc-9a10-ea8d88df6c5f',
    public: true,
    releaseMonth: '4',
    releaseYear: '2018'
  },
  {
    title: 'Raise a Hallelujah',
    artist: 'Bethel Music',
    art: 'https://mtracks.azureedge.net/public/images/albums/284/5711.jpg',
    creator: '8c1162cd-102c-47dc-9a10-ea8d88df6c5g',
    public: true,
    releaseMonth: '2',
    releaseYear: '2019'
  }
];

const activeTab = ref('mySongs');

function onChange (index) {
  const item = items[index]
  activeTab.value = item.slot;
}

const profile = {
  uuid: '2c1162cd-102c-47dc-9a10-ea8d88df6c5a'
};

const mySongs = computed(() =>
  songs.filter(song => song.creator === profile.uuid)
);

const topSongs = computed(() =>
  songs.filter(song => song.public)
);

const newReleases = computed(() => {
  const now = new Date();
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(now.getMonth() - 2);

  return songs.filter(song => {
    const releaseDate = new Date(song.releaseYear, song.releaseMonth - 1);
    return releaseDate >= twoMonthsAgo && releaseDate <= now;
  });
});
</script>