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
          <p class="text-xs">{{ section.id }}</p>
        </div>
        <UButtonGroup>
          <UButton
            v-for="button in buttons"
            size="sm"
            :key="button.icon"
            :icon="button.icon"
            :variant="button.variant" />
        </UButtonGroup>
      </div>
      <!--Bottom Div-->
      <div class="flex flex-wrap-reverse w-full gap-2 sm:flex-nowrap">
        <!--Left Div-->
        <div class="flex flex-col gap-2 basis-full sm:basis-1/2 min-w-72">
          <UInput
            v-model="section.name"
            placeholder="Section name" />
          <UTextarea
            v-model="section.content"
            autoresize
            :rows="4"
            placeholder="Lyrics and Chords here" />
        </div>
        <!--Right Div-->
        <div class="flex flex-col gap-2 basis-full sm:basis-1/2 min-w-72"></div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
const props = defineProps({
  section: Object,
  song: Object,
});

const buttons = [
  {
    icon: "i-heroicons-cloud-arrow-down-20-solid",
    variant: "outline",
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
  },
];
</script>
