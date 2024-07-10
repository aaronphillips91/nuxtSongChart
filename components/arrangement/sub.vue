<template>
  <BaseCard class="flex flex-col gap-2">
    <div
      v-if="!edit"
      class="flex items-center justify-between w-full">
      <div>{{ arrangement.name }}</div>
      <UButton
        label="Edit Details"
        @click="edit = !edit" />
    </div>
    <div
      v-if="edit"
      class="flex items-center justify-between">
      <UInput placeholder="Arrangement Name" />
      <UButton
        color="red"
        @click="handleDelete"
        label="Delete Arrangement" />
      <UButton
        @click="handleSave"
        label="Save Arrangement" />
    </div>
    <div class="flex h-6">
      <ArrangementPill
        v-for="section in arrangement.sections"
        :key="section.id"
        :section />
    </div>
  </BaseCard>
</template>

<script setup>
const { arrangement } = defineProps(["arrangement"]);

const edit = ref(false);

const handleSave = () => {
  console.log("Saving Arrangement");
  edit.value = false;
};

const handleDelete = () => {
  console.log("Deleting Arrangement");
};
</script>
