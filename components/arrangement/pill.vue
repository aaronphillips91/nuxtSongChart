<template>
  <div
    class="flex items-center gap-2 px-2 py-1 text-xs rounded cursor-move select-none bg-zinc-700 pill">
    <div>{{ section.name }}</div>
    <UIcon
      v-if="destructive"
      @click="handleDelete"
      class="text-white/10 hover:text-white hover:cursor-pointer"
      name="i-heroicons-x-circle-solid" />
  </div>
</template>

<script setup>
const { section, destructive } = defineProps(["section", "destructive"]);

const handleDelete = () => {
  console.log("delete section");
};
</script>
