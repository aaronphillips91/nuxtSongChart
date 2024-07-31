<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <img
      class="w-1/2 mx-auto dark:invert-0 invert"
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
    <div v-else>
      <UButton
        to="/login"
        label="Login" />
      <UButton
        to="/register"
        label="Register" />
    </div>
  </div>
</template>

<script setup>
//set layout to landing
definePageMeta({
  layout: "landing",
});

const user = useSupabaseUser();
console.log(user.value);

const session = useSupabaseSession();
console.log(session.value);

const list1 = ref([
  {
    name: "Intro",
    id: "926",
  },
  {
    name: "Verse",
    id: "218",
  },
  {
    name: "Chorus",
    id: "316",
  },
  {
    name: "Bridge",
    id: "420",
  },
]);
</script>
