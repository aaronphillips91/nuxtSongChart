<template>
  <div class="mx-2 xl:mx-auto max-w-7xl">
    <UButtonGroup class="flex text-center">
      <UButton
        v-for="button in buttons"
        :key="button.label"
        :label="button.label"
        :variant="button.variant"
        @click="button.function"
        color="gray"
        class="items-center justify-center flex-grow" />
    </UButtonGroup>
  </div>
</template>

<script setup>
const props = defineProps({
  buttons: {
    type: Array,
    required: true,
  },
});
</script>

<style></style>
