<template>
  <BaseCard class="flex flex-col w-full gap-2">
    <h1>{{ profile.first_name }}'s Profile</h1>
    <UTabs
      class="w-full mb-0"
      :items
      @change="onChange"
      :ui="{
        wrapper: 'relateive space-y-0',
        list: {
          tab: {
            size: 'text-xs',
          },
        },
      }" />
  </BaseCard>
</template>

<script setup>
const { profile } = defineProps(["profile"]);

const emit = defineEmits(["activeTab"]);

const activeTab = ref("details");

const items = [
  { slot: "mySongs", label: "My Songs" },
  { slot: "collaborations", label: "Collaborations" },
  { slot: "details", label: "Account Details" },
];

function onChange(index) {
  const item = items[index];
  activeTab.value = item.slot;
  emit("activeTab", item.slot);
}
</script>
