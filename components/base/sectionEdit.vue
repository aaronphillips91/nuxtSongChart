<template>
  <BaseCard>
    <div class="flex flex-col w-full gap-2">
      <!--Top Div-->
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-heroicons-bars-2"
            class="handle size-6 hover:cursor-grab active:cursor-grabbing" />
          <h4>{{ localSection.name }}</h4>
        </div>
        <div class="flex items-center gap-2">
          <p v-if="hasUnsavedChanges">Unsaved Changes</p>
          <div
            v-if="hasUnsavedChanges"
            class="flex">
            <UKbd>{{ metaSymbol }}</UKbd>
            <UKbd value="S" />
          </div>
          <UButtonGroup>
            <UButton
              v-for="button in buttons"
              size="sm"
              :key="button.icon"
              :icon="button.icon"
              :variant="button.variant"
              @click="button.click" />
          </UButtonGroup>
        </div>
      </div>
      <!--Bottom Div-->
      <div class="flex flex-wrap-reverse w-full gap-2 sm:flex-nowrap">
        <!--Left Div-->
        <div class="flex flex-col gap-2 basis-full sm:basis-1/2 min-w-72">
          <UInput
            v-model="localSection.name"
            placeholder="Section name" />
          <UTextarea
            v-model="localSection.content"
            autoresize
            wrap="off"
            class="overflow-x-scroll no-scrollbar text-nowrap"
            :rows="4"
            placeholder="Lyrics and Chords here" />
        </div>
        <!--Right Div-->
        <div
          :id="section.uuid"
          class="flex flex-col gap-2 overflow-x-scroll whitespace-pre-wrap no-scrollbar text-nowrap basis-full sm:basis-1/2 min-w-72"></div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
const { metaSymbol } = useShortcuts();
import { triggerFunction } from "~/utils/convertToChart";

const { section, song } = defineProps(["section", "song"]);

const localSection = ref(section);

console.log("This sections UUID is: ", section.uuid);
console.log("This sections UUID is: ", localSection.value.uuid);

const chartStore = useChartStore();
const hasUnsavedChanges = ref(false);

const emit = defineEmits(["delete"]);

const buttons = [
  {
    icon: "i-heroicons-cloud-arrow-down-20-solid",
    variant: "outline",
    click: () => {
      save();
    },
  },
  {
    icon: "i-heroicons-trash-solid",
    variant: "outline",
    click: () => {
      console.log("Deleting...");
      //delete the section using props.section.id to remove the section from props.song.sections
      chartStore.deleteSection(section);
      //emit delete to parent
      emit("delete");
    },
  },
];

const unsavedTrigger = () => {
  hasUnsavedChanges.value = true;
};

const save = () => {
  console.log("Saving...");
  console.log(section.content);
  hasUnsavedChanges.value = false;
  chartStore.updateSection(localSection.value);
  triggerFunction(section);
};

onMounted(() => {
  triggerFunction(section);
});
</script>
