<template>
  <div class="flex flex-col gap-4 px-4 my-4 7xl:mx-auto scPage">
    <div class="flex flex-col gap-2">
      <h4>Profile Setup</h4>
      <p class="text-xs">Welcome to SongChart! Let's get your profile set up so you can start exploring and sharing your musical journey. Please add your name and a profile picture to personalize your experience. If you'd like, you can also provide a contact phone number for seamless support and updates. Finally, choose a subscription tier that best suits your needs and unlock the full potential of SongChart. We're excited to have you on board and can't wait to see where your music takes you!</p>
    </div>
    <UDivider/>
    <div>
      <label for="profilePic">Profile Picture</label>
      <div class="relative flex items-center gap-4">
        <UIcon v-if="previewURL" @click="cancelImage" class="absolute -top-[16px] left-[76px] size-8 hover:bg-red-500 hover:cursor-pointer" name="i-heroicons-x-circle-solid"/>
        <img :src="computedImageSrc" class="rounded-lg size-24">
        <div class="flex flex-col gap-2">
          <UInput v-model="inputFile" @change="previewImage" type="file"/>
          <p class="text-xs text-gray-500">JPG, GIF, or PNG. 5MB max.</p>
        </div>
      </div>
    </div>
    <div class="flex w-full gap-4">
      <div class="w-full">
        <label for="name">Full Name</label>
        <UInput v-model="profileComputed.name" placeholder="Full Name" icon="i-heroicons-user-solid" color="white" variant="outline"/>
      </div>
      <div class="w-full">
        <label for="username">Username</label>
        <UInput v-model="profileComputed.username" placeholder="Username" icon="i-heroicons-at-symbol-solid" color="white" variant="outline"/>
      </div>
    </div>
    <div class="flex w-full gap-4">
      <div class="w-full">
        <label for="email">Email</label>
        <UInput v-model="profileComputed.email" placeholder="email" icon="i-heroicons-envelope-solid" color="white" variant="outline"/>
      </div>
      <div class="w-full">
        <label for="phone">Phone (Optional)</label>
        <UInput v-model="profileComputed.phone" placeholder="Phone" icon="i-heroicons-phone-solid" color="white" variant="outline"/>
      </div>
    </div>
    <UDivider/>
    <div class="flex flex-col gap-2">
      <h4>Choose your SongChart Tier</h4>
      <div class="text-xs">We're committed to delivering the best experience possible to musicians at any budget!  That's why we offer a free plan as well as options to expand your SongChart experience.</div>
    </div>
    <div class="flex gap-4">
      <div v-for="tier in tiers" class="flex flex-col w-full p-4 border rounded-lg border-zinc-700 scBackground hover:bg-zinc-800">
        <h4 class="text-center">{{ tier.name }}</h4>
        <div class="mb-4 font-black text-center">{{ tier.price }}</div>
        <div class="mb-4">
          <div v-for="n in tier.points" :key="n" class="mb-2 text-xs">- {{ n }}</div>
        </div>
        <UButton @click="setTier(tier.name)" block class="mt-auto">Select {{ tier.name }}</UButton>
      </div>
    
    </div>
    
    <div class="flex gap-4 mb-24 ml-auto">
      <UButton @click="getURL" variant="ghost" label="Finish Later"/>
      <UButton @click="setupProfile" label="Finish Profile Setup"/>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const profileStore = useProfileStore();
const profile = ref(profileStore.profile);

const previewURL = ref(null);
const selectedFile = ref(null);
const inputFile = ref(null);

const name = ref(profile.name);
const username = ref(profile.username);
const email = ref(profile.email);
const phone = ref(profile.phone);
const tier = ref(profile.tier)

onMounted(async () => {
  try {
    await profileStore.getProfile();
    profile.value = profileStore.profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
});

const previewImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    previewURL.value = URL.createObjectURL(file);
  }
};

const cancelImage = () => {
  selectedFile.value = null;
  previewURL.value = null;
  inputFile.value = null;
}

async function setupProfile() {
  if (selectedFile.value) {
    await profileStore.updateProfilePic(selectedFile.value)
  }
  const profileData = {
    name: profileComputed.value.name,
    username: profileComputed.value.username,
    email: profileComputed.value.email,
    phone: profileComputed.value.phone,
    sub_tier: tier.value,
  };
  await profileStore.updateProfile(profileData)
  navigateTo('/profile')
}

const computedImageSrc = computed(() => {
  if (previewURL.value) {
    return previewURL.value;
  } else if (profileStore.profile.pic) {
    return profileStore.profile.pic;
  } else {
    return 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg';
  }
});

const setTier = (tierName) => {
  tier.value = tierName;
  console.log(tier.value)
}

const profileComputed = computed(() => profile.value);

const tiers = [
  {
    name: "SongChart Free",
    price: "$0/mo",
    points: ["Free forever", "5 Songs", "1 Playlist"]
  },
  {
    name: "SongChart Plus",
    price: "$3/mo",
    points: ["Unlimited Songs and Playlists", "Share and Print Songs", "Access to Public Songs"]
  },
  {
    name: "SongChart Pro",
    price: "$5/mo",
    points: ["Everything SongChart has to offer", "Access to ShowMode", "Songwriting collaboration", "Access to beta features"]
  },
];
</script>