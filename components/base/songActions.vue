<template>
  <div class="flex w-full gap-2 scPage">
    <UButton v-for="action in actions" :label="action.label" />
  </div>
</template>

<script setup>
const actions = [
  {
    label: "Add Section",
    action: "",
  },
  {
    label: "Add Section",
    action: "",
  },
  {
    label: "Add Section",
    action: "",
  },
  {
    label: "Add Section",
    action: "",
  },
];
</script>
