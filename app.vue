<template>
  <div class="h-dvh">
    <NavDesktop />
    <NavMobile />
    <NuxtPage class="h-[calc(100dvh-96px)]" />
  </div>
</template>

<script setup>
  useHead({

    title: "SongChart",
    meta: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1",
      },
    ],
  });
  const profile = useProfileStore();
  profile.getProfile();
</script>
