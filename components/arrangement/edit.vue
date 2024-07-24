<template>
  <div class="flex flex-col gap-2">
    <BaseCard v-if="song">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          Base Sections
          <span class="text-xs font-semibold text-zinc-500">
            (Drag these sections into your arrangement to build your song.)
          </span>
        </div>
        <VueDraggable
          @end=""
          v-model="sections"
          :animation="250"
          :group="{ name: 'pills', pull: 'clone', put: false }"
          :sort="true"
          :handle="'.pill'"
          class="flex gap-2">
          <ArrangementPill
            v-for="section in sections"
            :section
            :destructive="false"
            :key="section" />
        </VueDraggable>
      </div>
    </BaseCard>
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
          v-for="section in arrangementSections"
          :key="section.uuid"
          :section
          :destructive="true" />
      </VueDraggable>
    </BaseCard>
  </div>
</template>

<script setup>
import { VueDraggable } from "vue-draggable-plus";
const { arrangement, song } = defineProps(["arrangement", "song"]);
const chartStore = useChartStore();
const isEditing = ref(false);
const localArrangement = {
  name: ref(arrangement.name),
  uuid: ref(arrangement.uuid),
  song: ref(arrangement.song),
};

const arrangementSections = ref([]);

const nameInput = ref(null);

onMounted(async () => {
  await chartStore.getSections(song.uuid);
  arrangementSections.value = await chartStore.getArrangementSections(
    arrangement.uuid
  );
});

const sections = chartStore.sections;

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

<style></style>
