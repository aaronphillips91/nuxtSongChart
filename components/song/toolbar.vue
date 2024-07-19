<template>
  <div class="flex justify-around">
    <div class="flex items-center gap-2">
      Key:
      <UDropdown
        :items="keyOptions"
        :popper="{ placement: 'bottom-start' }">
        <UButton
          :label="song.original_key"
          trailing-icon="i-heroicons-chevron-down-20-solid" />
      </UDropdown>
    </div>
    <div class="flex items-center gap-2">
      Tempo:
      <UPopover>
        <UButton :label="song.tempo.toString()" />
        <template #panel>
          <div class="p-4 w-80">
            <URange
              :min="20"
              :max="300"
              v-model="song.tempo"
              @change="updateTempo" />
          </div>
        </template>
      </UPopover>
    </div>
    <div>
      Public:
      <UButton
        :label="song.public.toString()"
        @click="updatePublic" />
    </div>
  </div>
</template>

<script setup>
const { song } = defineProps(["song"]);
const chartStore = useChartStore();

const keyOptions = [
  [
    {
      label: "C",
      value: "C",
      click: () => {
        updateKey("C");
      },
    },
    {
      label: "C#",
      value: "C#",
      click: () => {
        updateKey("C#");
      },
    },
    {
      label: "D",
      value: "D",
      click: () => {
        updateKey("D");
      },
    },
    {
      label: "Eb",
      value: "Eb",
      click: () => {
        updateKey("Eb");
      },
    },
    {
      label: "E",
      value: "E",
      click: () => {
        updateKey("E");
      },
    },
    {
      label: "F",
      value: "F",
      click: () => {
        updateKey("F");
      },
    },
    {
      label: "F#",
      value: "F#",
      click: () => {
        updateKey("F#");
      },
    },
    {
      label: "G",
      value: "G",
      click: () => {
        updateKey("G");
      },
    },
    {
      label: "Ab",
      value: "Ab",
      click: () => {
        updateKey("Ab");
      },
    },
    {
      label: "A",
      value: "A",
      click: () => {
        updateKey("A");
      },
    },
    {
      label: "Bb",
      value: "Bb",
      click: () => {
        updateKey("Bb");
      },
    },
    {
      label: "B",
      value: "B",
      click: () => {
        updateKey("B");
      },
    },
  ],
];

const updateKey = (key) => {
  song.original_key = key;
  chartStore.updateSong(song);
};

const updateTempo = () => {
  chartStore.updateSong(song);
};

const updatePublic = () => {
  song.public = !song.public;
  chartStore.updateSong(song);
};
</script>
