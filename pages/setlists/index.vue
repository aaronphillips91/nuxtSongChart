<template>
  <SetlistsHeader @filterName="handleFilter" />
  <NuxtLink
    :to="`/setlists/${setlist.id}`"
    class="flex gap-2 p-2 scPage hover:bg-primary-500/10 hover:cursor-pointer first-of-type:mt-2 scBorder scBackground scRounded"
    v-for="setlist in setlists">
    <div>
      <img
        class="rounded-md size-16 scBorder"
        :src="setlist.art"
        alt="" />
    </div>
    <div class="flex flex-col justify-center">
      <h4>{{ setlist.title }}</h4>
      <p>{{ setlist.date }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
  definePageMeta({
    middleware: "auth",
  });
  const client = useSupabaseClient();
  const setlists = ref(null);

  const activeFilter = ref("upcoming");

  function handleFilter(filter) {
    activeFilter.value = filter;
    console.log(activeFilter.value);
  }

  async function fetchSetlists() {
    const { data, error } = await client.from("setlists").select("*");
    if (error) {
      console.error(error);
    } else {
      songs.value = data;
    }
  }

  fetchSetlists();
</script>

<style></style>
