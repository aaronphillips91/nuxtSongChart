<template>
  <BaseCard class="flex flex-col items-center w-screen gap-2">
    <div class="flex flex-row items-center w-full gap-2">
      <img
        class="rounded size-32"
        :src="song.art"
        alt="" />
      <div class="flex flex-col gap-2">
        <h4>{{ song.title }}</h4>
        <p>{{ song.artist }}</p>
      </div>
      <div class="flex items-center self-start gap-2 ml-auto">
        <UButton
          @click="navigateTo(`/songs/${song.uuid}`)"
          label="Back to song" />
        <UButton
          color="gray"
          square
          icon="i-heroicons-information-circle-solid" />
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
const { song } = defineProps(["song"]);

const emit = defineEmits(["activeTab"]);
</script>
