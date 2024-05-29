<template>
  <component
    :is="props.as"
    class="box-border px-2 py-1 text-white border border-white rounded-lg w-fit"
    :class="({ '!w-full': props.full }, props.color)">
    <svg
      v-if="props.loading"
      class="absolute animate-spin size-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24">
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <UIcon v-if="props.leftIcon" class="" :name="props.leftIcon" />
    <p v-if="props.text">{{ props.text }}</p>
    <UIcon v-if="props.rightIcon" class="" :name="props.rightIcon" />
  </component>
</template>

<script setup>
const props = defineProps({
  leftIcon: String,
  rightIcon: String,
  text: String,
  loading: Boolean,
  color: String,
  as: {
    type: [String, Object],
    default: "button",
  },
  full: Boolean,
});
</script>
