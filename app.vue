<template>
  <div>
    <ScNavigation />
    <ScMobileNav />
    <NuxtPage />
  </div>
</template>

<script setup>
  useHead({
    title: "SongChart",
    meta: [
      {
        name: "description",
        content: "A home for your songs",
      },
    ],
  });
  const profile = useProfileStore();
  profile.getProfile();
</script>
