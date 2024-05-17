<template>
  <div class="flex flex-col w-full gap-12 px-4 mt-12 text-center">
    <h1>Welcome to SongChart</h1>
    <img
      class="mx-auto max-w-96 dark:invert invert-0"
      src="../static/logos/SongChart Icon.svg"
      alt="" />

    <h2>Your songs, charted.</h2>
  </div>
  <div class="grid grid-cols-1 gap-4 my-12 md:grid-cols-2 scPage">
    <div class="flex w-full p-4 border rounded-lg h-72 scBackground scBorder">
      <div class="flex items-center justify-center w-full h-full bg-red-500">Hello World</div>
      <div class="w-full h-full bg-green-500"><img src="" alt=""></div>
    </div>
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
