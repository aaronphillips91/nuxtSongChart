<template>
  <div class="flex flex-col gap-4 px-4 my-4 7xl:mx-auto scPage">
    <div class="flex flex-col gap-2">
      <h4>Edit Profile</h4>
    </div>
    <UDivider />
    <div>
      <label for="profilePic">Profile Picture</label>
      <div class="relative flex items-center gap-4">
        <UIcon
          v-if="profileStore.files"
          @click="cancelImage"
          class="absolute -top-[16px] left-[76px] size-8 hover:bg-red-500 hover:cursor-pointer"
          name="i-heroicons-x-circle-solid" />
        <img
          :src="computedImageSrc"
          class="rounded-lg size-24" />
        <div class="flex flex-col gap-2">
          <input
            id="file-upload"
            class="hidden"
            @change="handleFileSelect"
            type="file" />
          <label
            for="file-upload"
            class="px-2 py-1 text-black rounded-lg bg-primary-400 hover:bg-primary-500 hover:cursor-pointer">
            {{ profileStore.files?.upload.name || "Upload Profile Picture" }}
          </label>
          <p class="text-xs text-gray-500">JPG, GIF, or PNG. 5MB max.</p>
        </div>
      </div>
    </div>
    <div class="flex w-full gap-4">
      <div class="w-full">
        <label for="name">Full Name</label>
        <UInput
          v-model="profileStore.profile.name"
          placeholder="Full Name"
          icon="i-heroicons-user-solid"
          color="white"
          variant="outline" />
      </div>
      <div class="w-full">
        <label for="username">Username</label>
        <UInput
          v-model="profileStore.profile.username"
          placeholder="Username"
          icon="i-heroicons-at-symbol-solid"
          color="white"
          variant="outline" />
      </div>
    </div>
    <div class="flex w-full gap-4">
      <div class="w-full">
        <label for="email">Email</label>
        <UInput
          v-model="profileStore.profile.email"
          placeholder="email"
          icon="i-heroicons-envelope-solid"
          color="white"
          variant="outline" />
      </div>
      <div class="w-full">
        <label for="phone">Phone (Optional)</label>
        <UInput
          v-model="profileStore.profile.phone"
          placeholder="Phone"
          icon="i-heroicons-phone-solid"
          color="white"
          variant="outline" />
      </div>
    </div>
    <UDivider />
    <div class="flex flex-col gap-2">
      <h4>Choose your SongChart Tier</h4>
      <div class="text-xs">
        We're committed to delivering the best experience possible to musicians
        at any budget! That's why we offer a free plan as well as options to
        expand your SongChart experience.
      </div>
    </div>
    <div class="flex gap-4">
      <div
        v-for="t in tiers"
        class="flex flex-col w-full p-4 border rounded-lg min-w-72 border-zinc-700 scBackground hover:bg-zinc-800"
        :class="{
          '!border-primary-500': t.name == profileStore.profile.sub_tier,
        }">
        <h4 class="text-center">{{ t.name }}</h4>
        <div class="mb-4 font-black text-center">{{ t.price }}</div>
        <div class="mb-4">
          <div
            v-for="n in t.points"
            :key="n"
            class="mb-2 text-xs">
            - {{ n }}
          </div>
        </div>
        <UButton
          @click="setTier(t.name)"
          block
          class="mt-auto">
          {{
            t.name === profileStore.profile.sub_tier
              ? "Current Tier"
              : "Select " + t.name
          }}
        </UButton>
      </div>
    </div>

    <div class="flex gap-4 mb-24 ml-auto">
      <UButton
        @click="cancelEdit"
        variant="ghost"
        label="Cancel" />
      <UButton
        :loading="profileStore.loading"
        @click="updateProfile"
        label="Save Changes" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const profileStore = useProfileStore();

const currentTier = ref(profileStore.profile.sub_tier);

onMounted(async () => {
  try {
    profileStore.files = null;
    await profileStore.getProfile();
    console.log("Profile fetched successfully");
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
});

const handleFileSelect = (event) => {
  const upload = event.target.files[0];
  console.log(upload);
  const file = {
    upload,
    url: URL.createObjectURL(upload),
  };
  profileStore.files = file;
  console.log(profileStore.files);
};

const cancelImage = () => {
  profileStore.files = null;
};

const computedImageSrc = computed(() => {
  if (profileStore.files) {
    console.log("Preview Image Available");
    return profileStore.files.url;
  } else if (profileStore.profile && profileStore.profile.pic) {
    console.log("Profile Pic Available");
    return profileStore.profile.pic;
  } else {
    console.log("No Image Available");
    return "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg";
  }
});

const setTier = (tierName) => {
  profileStore.profile.sub_tier = tierName;
  console.log(profileStore.profile.sub_tier);
};

const updateProfile = async () => {
  if (profileStore.files) {
    await profileStore.updateProfilePic(profileStore.files.upload);
  } else {
    await profileStore.updateProfile();
  }
  if (profileStore.profile.sub_tier !== currentTier.value) {
    console.log("Tier Changed");
    navigateTo(`/profile/confirm-tier/${profileStore.profile.sub_tier}`);
  } else {
    navigateTo("/profile");
  }
};

const cancelEdit = async () => {
  await profileStore.getProfile();
  profileStore.files = null;
  navigateTo("/profile");
};

const tiers = [
  {
    name: "SongChart Free",
    price: "$0/mo",
    points: ["Free forever", "5 Songs", "1 Playlist"],
    active: false,
  },
  {
    name: "SongChart Plus",
    price: "$3/mo",
    points: [
      "Unlimited Songs and Playlists",
      "Share and Print Songs",
      "Access to Public Songs",
    ],
    active: false,
  },
  {
    name: "SongChart Pro",
    price: "$5/mo",
    points: [
      "Everything SongChart has to offer",
      "Access to ShowMode",
      "Songwriting collaboration",
      "Access to beta features",
    ],
    active: false,
  },
];
</script>
