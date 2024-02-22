<template>
  <div class="flex flex-col gap-4 my-4 scPage">
    <div class="flex justify-between">
      <h1>Setlists</h1>
      <UButton variant="outline">Add Setlist</UButton>
    </div>
    <div>
      <UTabs
        :ui="{
          list: {
            background: 'bg-neutral-200 dark:bg-neutral-900',
            marker: {
              background: 'bg-white dark:bg-gray-800',
            },
            tab: {
              inactive: 'text-gray-500 dark:text-gray-500',
            },
          },
        }"
        @change="handleClick"
        :items="items">
      </UTabs>
    </div>
  </div>
</template>

<script setup>
  const items = [
    {
      slot: "upcoming",
      label: "Upcoming",
    },
    {
      slot: "past",
      label: "Past",
    },
  ];

  const emits = defineEmits(["filterName"]);

  function handleClick(index) {
    const item = items[index];
    emits("filterName", item.slot);
  }
</script>
