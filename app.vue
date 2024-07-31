<template>
  <NuxtLayout>
    <NuxtPage class="min-h-[calc(100dvh-96px)]" />
  </NuxtLayout>
</template>

<script setup>
const profile = useProfileStore();
profile.getProfile();

useHead({
  title: "SongChart",
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=1",
    },
  ],
});
</script>
