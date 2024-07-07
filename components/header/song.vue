<template>
  <div class="flex flex-col !w-full gap-2">
    <BaseCard class="flex flex-col items-center gap-2">
      <div class="flex flex-row items-center w-full gap-2">
        <img
          class="rounded size-32"
          :src="song.art"
          alt="" />
        <div class="flex flex-col gap-2">
          <h4>{{ song.title }}</h4>
          <p>{{ song.artist }}</p>
        </div>
      </div>
      <UTabs
        class="w-full mb-0"
        :items
        @change="onChange"
        :ui="{
          wrapper: 'relateive space-y-0',
          list: {
            tab: {
              size: 'text-xs',
            },
          },
        }" />
    </BaseCard>
  </div>
</template>

<script setup>
const { song } = defineProps(["song"]);

const emit = defineEmits(["activeTab"]);

const activeTab = ref("sections");

const items = [
  { slot: "sections", label: "Sections" },
  { slot: "arrangements", label: "Arrangements" },
  { slot: "details", label: "Song Details" },
];

function onChange(index) {
  const item = items[index];
  activeTab.value = item.slot;
  emit("activeTab", item.slot);
}
</script>
