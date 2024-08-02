<template>
  <div>
    <label :for="label">{{ label }}</label>
    <div class="relative flex items-center gap-4">
      <UIcon
        v-if="previewURL"
        @click="cancelImage"
        class="absolute -top-[16px] left-[76px] size-8 hover:bg-red-500 hover:cursor-pointer"
        name="i-heroicons-x-circle-solid" />
      <img
        :src="computedImageSrc"
        class="rounded-lg size-24" />
      <div class="flex flex-col gap-2">
        <UInput
          v-model="inputFile"
          @change="previewImage"
          type="file" />
        <p class="text-xs text-gray-500">JPG, GIF, or PNG. 5MB max.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const profileStore = useProfileStore();
const chartStore = useChartStore();

const previewURL = ref(null);
const selectedFile = ref(null);
const inputFile = ref(null);

const { label, intent } = defineProps({
  label: String,
  intent: {
    type: String,
    validator: function (value) {
      return ["album", "profile"].includes(value);
    },
  },
});

const emit = defineEmits(["file-selected"]);

const previewImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    previewURL.value = URL.createObjectURL(file);
    console.log(file.name);
    emit("file-selected", file);
  }
};

const cancelImage = () => {
  selectedFile.value = null;
  previewURL.value = null;
  inputFile.value = null;
};

const computedImageSrc = computed(() => {
  switch (true) {
    case !!previewURL.value:
      return previewURL.value;

    default:
      switch (intent) {
        case "album":
          if (chartStore.song && chartStore.song.art) {
            console.log("album is the intent");
            return chartStore.song.art;
          } else {
            console.log("album is the intent");
            return "https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png";
          }
          break;

        case "profile":
          if (profileStore.profile && profileStore.profile.pic) {
            console.log("profile is the intent");
            return profileStore.profile.pic;
          } else {
            console.log("profile is the intent");
            return "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg";
          }
          break;

        default:
          console.log("did not meet any criteria");
          return "https://www.wolflair.com/wp-content/uploads/2017/01/placeholder.jpg";
      }
  }
});
</script>
