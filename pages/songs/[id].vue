<template>
  <div
    v-if="song"
    class="flex gap-4 p-2 mt-2 scPage scBackground scBorder scRounded">
    <img
      class="rounded-md size-20 sm:size-24 scBorder"
      :src="song.art"
      alt="" />
    <div class="flex flex-col justify-center w-full">
      <h2 class="line-clamp-1">
        {{ song.title }}
      </h2>
      <p>{{ song.artist }}</p>
    </div>
    <UDropdown
      class="h-fit"
      :items="items"
      :popper="{ placement: 'bottom-end' }">
      <UButton
        class="items-center justify-center size-8"
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
