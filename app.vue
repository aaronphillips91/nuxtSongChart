<template>
  <div>
    <ScNavigation />
    <ScMobileNav />
    <NuxtPage />
  </div>
</template>

<script setup>
  const profile = useProfileStore();

  profile.getProfile();
</script>
