<template>
  <div
    v-if="song"
    class="scPage scBackground scBorder scRounded p-2 mt-2 flex gap-4">
    <img
      class="size-24 rounded-md scBorder"
      :src="song.art"
      alt="" />
    <div class="flex flex-col w-full justify-center">
      <h1 class="line-clamp-1">
        {{ song.title }}
      </h1>
      <p>{{ song.artist }}</p>
    </div>
    <UDropdown
      class="h-fit"
      :items="items"
      :popper="{ placement: 'bottom-end' }">
      <UButton
        class="size-8 items-center justify-center"
        color="gray"
        square
        icon="i-heroicons-pencil-square-solid" />
    </UDropdown>
  </div>
</template>

<script setup>
  const route = useRoute();
  const client = useSupabaseClient();

  const items = [
    [
      {
        label: "Edit",
        icon: "i-heroicons-pencil-square-20-solid",
        shortcuts: ["E"],
        click: () => {
          console.log("Edit");
        },
      },
    ],
    [
      {
        label: "Add to Setlist",
        icon: "i-heroicons-queue-list-20-solid",
      },
      {
        label: "Open in ShowMode",
        icon: "i-heroicons-microphone-20-solid",
      },
    ],
    [
      {
        label: "Delete",
        icon: "i-heroicons-trash-20-solid",
        shortcuts: ["D"],
      },
    ],
  ];

  const songId = route.params.id;
  const song = ref(null);

  async function fetchSong() {
    const { data, error } = await client
      .from("songs")
      .select("*")
      .eq("id", songId);
    if (error) {
      console.error(error);
    } else {
      song.value = data[0];
    }
  }

  onMounted(() => {
    fetchSong();
  });
</script>
