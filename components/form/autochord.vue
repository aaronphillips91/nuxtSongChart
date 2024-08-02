<template>
  <div>
    <UTextarea
      class="overflow-x-scroll no-scrollbar text-nowrap"
      wrap="off"
      :rows="4"
      autoresize
      @keydown.`.prevent="keydown($event)"
      v-model="lyrics"
      ref="textarea" />
    <ChordPopup
      v-if="popupVisible"
      :visible="popupVisible"
      :position="popupPosition"
      :songKey="songKey"
      @select="insertChord" />
  </div>
</template>

<script setup>
const popupVisible = ref(false);
const popupPosition = reactive({ top: 0, left: 0 });
const { songKey, section } = defineProps(["songKey", "section"]);
const lyrics = ref(section.content);

const textarea = ref(null);

const keydown = (event) => {
  popupVisible.value = !popupVisible.value;

  const rect = textarea.value.$el.getBoundingClientRect();
  popupPosition.top = event.clientY - rect.top;
  popupPosition.left = event.clientX - rect.left;
};

const insertChord = (chord) => {
  const textareaElement = textarea.value.$el.querySelector("textarea");
  const start = textareaElement.selectionStart;
  const end = textareaElement.selectionEnd;

  lyrics.value =
    lyrics.value.substring(0, start) +
    `[${chord}]` +
    lyrics.value.substring(end);
  popupVisible.value = false;
};
</script>

<style></style>
