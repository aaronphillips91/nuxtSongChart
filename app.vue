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

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>