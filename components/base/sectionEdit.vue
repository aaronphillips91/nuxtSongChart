<template>
  <BaseCard>
    <div class="flex flex-col w-full gap-2">
      <!--Top Div-->
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-heroicons-bars-2"
            class="handle size-6 hover:cursor-grab active:cursor-grabbing" />
          <h4>{{ section.name }}</h4>
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
            v-model="section.name"
            placeholder="Section name"
            @input="unsavedTrigger" />
          <UTextarea
            v-model="section.content"
            autoresize
            wrap="off"
            class="overflow-x-scroll text-nowrap"
            :rows="4"
            placeholder="Lyrics and Chords here"
            @input="unsavedTrigger" />
        </div>
        <!--Right Div-->
        <div
          :id="section.id"
          class="flex flex-col gap-2 overflow-x-scroll whitespace-pre-wrap text-nowrap basis-full sm:basis-1/2 min-w-72"></div>
      </div>
      <p class="self-end text-[10px] text-zinc-500">
        Section ID: {{ section.id }}
      </p>
    </div>
  </BaseCard>
</template>

<script setup>
const { metaSymbol } = useShortcuts();
const props = defineProps({
  section: Object,
  song: Object,
});

const songStore = useSongStore();
const hasUnsavedChanges = ref(false);

const buttons = [
  {
    icon: "i-heroicons-cloud-arrow-down-20-solid",
    variant: "outline",
    click: () => {
      save();
    },
  },
  {
    icon: "i-heroicons-chevron-up-solid",
    variant: "outline",
  },
  {
    icon: "i-heroicons-chevron-down-solid",
    variant: "outline",
  },
  {
    icon: "i-heroicons-trash-solid",
    variant: "outline",
    click: () => {
      console.log("Deleting...");
      //delete the section using props.section.id to remove the section from props.song.sections
      songStore.deleteSection(props.section.id);
    },
  },
];

const unsavedTrigger = () => {
  hasUnsavedChanges.value = true;
};

const save = () => {
  console.log("Saving...");
  hasUnsavedChanges.value = false;
  songStore.saveSection(props.section);
  triggerFunction(props.section);
};

onMounted(() => {
  triggerFunction(props.section);
});

function triggerFunction(section) {
  const text = section.content;
  const formattedSection = convertToChordsAndLyrics(text);
  console.log(
    "this is the content from the formatted section: ",
    formattedSection
  );
  const songContainer = document.getElementById(props.section.id);
  songContainer.innerHTML = formattedSection;
}

function convertToChordsAndLyrics(input) {
  const lines = input.split("\n");
  let formattedSection = "<div class='song'>";

  for (const line of lines) {
    const { notes, lyrics } = splitNotesAndLyrics(line);
    formattedSection += `<div class='line'>`;
    formattedSection += `<div class='font-mono font-bold chords text-primary-500'>${notes}</div>`;
    formattedSection += `<div class='font-mono lyrics'>${lyrics}</div>`;
    formattedSection += `</div>`;
  }

  formattedSection += "</div>";
  return formattedSection;
}

function splitNotesAndLyrics(c) {
  const parts = c.split(/(\[[^\]]+\])/);
  return parts.reduce(
    function (acc, curr) {
      if (curr.startsWith("[") && curr.endsWith("]")) {
        const cleanNote = curr.replace(/[[\]]/g, "");
        const offset = acc.lyrics.length - acc.notes.length + cleanNote.length;
        acc.notes += cleanNote.padStart(offset, " ");
      } else {
        acc.lyrics += curr;
      }
      return acc;
    },
    { notes: "", lyrics: "" }
  );
}
</script>
