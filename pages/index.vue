<template>
  <div class="flex flex-col w-full gap-12 mt-12 text-center">
    <h1>Welcome to SongChart</h1>
    <img
      class="mx-auto max-w-96 dark:invert invert-0"
      src="../static/logos/SongChart Icon.svg"
      alt="" />

    <h2>A home for your songs</h2>
  </div>
  <div class="grid grid-cols-2 gap-4 my-12 scPage">
    <div class="w-full border rounded-lg h-72 scBackground scBorder"></div>
    <div class="w-full border rounded-lg h-72 scBackground scBorder"></div>
    <div class="w-full border rounded-lg h-72 scBackground scBorder"></div>
    <div class="w-full border rounded-lg h-72 scBackground scBorder"></div>
  </div>

  <UButton @click="signout()">Signout</UButton>
</template>

<script setup>
  const client = useSupabaseClient();
  async function signout() {
    await client.auth.signOut();
  }
</script>

<style></style>
