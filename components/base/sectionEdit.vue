<template>
  <BaseCard>
    <div class="flex flex-col w-full gap-2">
      <!--Top Div-->
      <div class="flex items-center justify-between w-full">
        <h4>Section Name</h4>
        <UButtonGroup>
          <UButton
            v-for="button in buttons"
            :key="button.icon"
            :icon="button.icon"
            :variant="button.variant" />
        </UButtonGroup>
      </div>
      <!--Bottom Div-->
      <div class="flex flex-wrap-reverse w-full gap-2 sm:flex-nowrap">
        <!--Left Div-->
        <div class="flex flex-col basis-full sm:basis-1/2 min-w-72">
          <UTextarea
            autoresize
            rows="4"
            placeholder="Lyrics and Chords here" />
        </div>
        <!--Right Div-->
        <div class="flex flex-col gap-2 basis-full sm:basis-1/2 min-w-72">
          <UInput placeholder="Section name" />
          <UInput placeholder="Section notes" />
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
const buttons = [
  {
    icon: "i-heroicons-cloud-arrow-down-20-solid",
    variant: "outline",
    disabled: true,
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

<style></style>
