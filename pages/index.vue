<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <img
      class="w-1/2 mx-auto dark:invert-0 invert"
      src="/logos/SongChart Logo.svg"
      alt="" />
    <div v-if="user">
      <UButton
        to="/profile"
        label="Dashboard" />
    </div>
    <UButtonGroup v-else>
      <UButton
        color="white"
        to="/login"
        label="Login" />
      <UButton
        to="/register"
        label="Register" />
    </UButtonGroup>
  </div>
</template>

<script setup>
//set layout to landing
definePageMeta({
  layout: "landing",
});

const user = useSupabaseUser();
</script>
