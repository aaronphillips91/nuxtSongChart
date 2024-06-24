<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <img
      class="w-1/2 mx-auto"
      src="/logos/SongChart Logo.svg"
      alt="" />
    <div
      v-if="!user"
      class="flex gap-4">
      <UButton
        to="/login"
        label="Login" />
      <UButton
        to="/register"
        label="Register" />
    </div>
    <div v-if="user">
      <UButton
        to="/songs"
        label="Dashboard" />
    </div>
  </div>
</template>

<script setup>
//set layout to landing
definePageMeta({
  layout: "landing",
});

const user = useSupabaseUser();
</script>
