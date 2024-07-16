<template>
  <BaseCard>
    <div
      id="main"
      class="flex flex-col w-full gap-2 p-4">
      <div
        id="top"
        class="flex items-center justify-between">
        <div
          id="top-left"
          class="flex items-center gap-2">
          <UIcon
            name="i-heroicons-bars-2"
            class="handle size-6 hover:cursor-grab active:cursor-grabbing" />
          <div v-if="!isEditing">{{ section.name }}</div>
          <input
            v-else
            type="text"
            v-model="localName" />
        </div>
        <div id="top-right">
          <UDropdown :items>
            <UButton
              color="white"
              :label="isEditing ? 'Save' : 'Edit'"
              trailing-icon="i-heroicons-chevron-down-20-solid" />
          </UDropdown>
        </div>
      </div>
      <div id="bottom">
        <div id="bottom-left"></div>
        <div id="bottom-right"></div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
const chartStore = useChartStore();
const { section, song } = defineProps(["section", "song"]);
const isEditing = ref(false);
const localName = ref(section.name);

const items = computed(() => {
  let baseItems = [];

  if (isEditing.value === false) {
    baseItems = [
      [
        {
          label: "Edit section name",
          icon: "i-heroicons-pencil-square-20-solid",
          shortcuts: ["E"],
          click: () => {
            isEditing.value = true;
          },
        },
      ],
      [
        {
          label: "Delete section",
          icon: "i-heroicons-trash-20-solid",
          shortcuts: ["D"],
          click: () => {
            console.log("Deleting...");
          },
        },
      ],
    ];
  } else {
    baseItems = [
      [
        {
          label: "Save",
          icon: "i-heroicons-check-20-solid",
          shortcuts: ["Enter"],
          click: () => {
            section.name = localName.value;
            chartStore.updateSection(section);
            isEditing.value = false;
          },
        },
        {
          label: "Cancel",
          icon: "i-heroicons-x-circle-solid",
          shortcuts: ["Esc"],
          click: () => {
            localName.value = section.name;
            isEditing.value = false;
          },
        },
      ],
      [
        {
          label: "Delete section",
          icon: "i-heroicons-trash-20-solid",
          shortcuts: ["D"],
          click: () => {
            chartStore.deleteSection(section);
          },
        },
      ],
    ];
  }

  return baseItems;
});
</script>
