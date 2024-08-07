<template>
  <BaseCard class="flex flex-col gap-2">
    <div
      id="top"
      class="flex justify-between">
      <div
        id="top-left"
        class="flex flex-row items-center gap-2">
        <div v-if="!isEditing">{{ arrangement.name }}</div>
        <input
          v-else
          ref="nameInput"
          @keydown.enter="handleSave"
          type="text"
          v-model="localArrangement.name.value" />
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
    <VueDraggable
      group="pills"
      class="flex h-6">
      <ArrangementPill
        v-for="section in sections"
        :key="section.uuid"
        :section
        :destructive="true" />
    </VueDraggable>
  </BaseCard>
</template>

<script setup>
import { VueDraggable } from "vue-draggable-plus";
const { arrangement } = defineProps(["arrangement"]);
const isEditing = ref(false);
const chartStore = useChartStore();
const localArrangement = {
  name: ref(arrangement.name),
  uuid: ref(arrangement.uuid),
  song: ref(arrangement.song),
};

const sections = ref([]);

const nameInput = ref(null);

onMounted(async () => {
  sections.value = chartStore.getArrangementSections(arrangement.uuid);
});

const handleSave = () => {
  arrangement.name = localArrangement.name.value;
  chartStore.updateArrangement(arrangement);
  isEditing.value = false;
};

const items = computed(() => {
  let baseItems = [];

  if (isEditing.value === false) {
    baseItems = [
      [
        {
          label: "Edit arrangement name",
          icon: "i-heroicons-pencil-square-20-solid",
          shortcuts: ["E"],
          click: () => {
            isEditing.value = true;
            nextTick(() => {
              nameInput.value.focus();
            });
          },
        },
      ],
      [
        {
          label: "Delete arrangement",
          icon: "i-heroicons-trash-20-solid",
          shortcuts: ["D"],
          click: () => {
            chartStore.deleteArrangement(arrangment);
            navigateTo(`/songs/${arrangement.song}`);
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
            arrangement.name = localArrangement.name.value;
            chartStore.updateArrangement(arrangement);
            isEditing.value = false;
          },
        },
        {
          label: "Cancel",
          icon: "i-heroicons-x-circle-solid",
          shortcuts: ["Esc"],
          click: () => {
            localArrangement.name.value = arrangement.name;
            isEditing.value = false;
          },
        },
      ],
      [
        {
          label: "Delete arrangement",
          icon: "i-heroicons-trash-20-solid",
          shortcuts: ["D"],
          click: () => {
            chartStore.deleteArrangement(arrangement);
            navigateTo(`/songs/${arrangement.song}`);
          },
        },
      ],
    ];
  }

  return baseItems;
});
</script>
