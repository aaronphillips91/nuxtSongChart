<template>
  <BaseCard>
    <div
      id="main"
      class="flex flex-col w-full gap-2">
      <div
        id="top"
        class="flex justify-between">
        <div
          id="top-left"
          class="flex flex-row items-center gap-2">
          <UIcon
            name="i-heroicons-bars-2"
            class="handle size-6 hover:cursor-grab active:cursor-grabbing" />
          <div v-if="!isEditing">{{ section.name }}</div>
          <input
            v-else
            @keydown.enter="handleSave"
            type="text"
            v-model="localSection.name.value" />
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
      <div
        id="bottom"
        class="flex gap-4">
        <div
          id="bottom-left"
          class="flex flex-col w-1/2 gap-2 min-w-96">
          <FormAutochord
            :section
            :songKey="song.original_key" />
        </div>
        <div
          id="bottom-right"
          class="w-1/2 min-w-96">
          <div
            class="overflow-hidden overflow-x-scroll whitespace-pre-wrap no-scrollbar text-nowrap"
            v-html="localSection.formattedContent.value"></div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { triggerFunction } from "~/utils/convertToChart";
const chartStore = useChartStore();
const { section, song } = defineProps(["section", "song"]);
const isEditing = ref(false);
const localSection = {
  name: ref(section.name),
  content: ref(section.content),
  uuid: ref(section.uuid),
  song: ref(section.song),
  formattedContent: ref(section.formattedContent),
};

const handleSave = () => {
  section.name = localSection.name.value;
  chartStore.updateSection(section);
  isEditing.value = false;
};

const handleChange = async () => {
  const saveSection = {
    name: localSection.name.value,
    content: localSection.content.value,
    uuid: localSection.uuid.value,
    song: localSection.song.value,
    formattedContent: triggerFunction(localSection),
  };
  await chartStore.updateSection(saveSection);
};

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
            chartStore.deleteSection(section);
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
            section.name = localSection.name.value;
            chartStore.updateSection(section);
            isEditing.value = false;
          },
        },
        {
          label: "Cancel",
          icon: "i-heroicons-x-circle-solid",
          shortcuts: ["Esc"],
          click: () => {
            localSection.name.value = section.name;
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
