<template>
  <div>
    <label :for="label">{{ label }}</label>
    <UInput
      :type="type"
      :id="label"
      :value="modelValue"
      @input="updateValue($event.target.value)" />
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emit("update:modelValue", value);
};
</script>
