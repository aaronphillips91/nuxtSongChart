<template>
  <div class="flex flex-col gap-4 px-4 my-4 7xl:mx-auto scPage">
    <div class="flex flex-col gap-2">
      <h4>Profile Setup</h4>
      <p class="text-xs">Welcome to SongChart! Let's get your profile set up so you can start exploring and sharing your musical journey. Please add your name and a profile picture to personalize your experience. If you'd like, you can also provide a contact phone number for seamless support and updates. Finally, choose a subscription tier that best suits your needs and unlock the full potential of SongChart. We're excited to have you on board and can't wait to see where your music takes you!</p>
    </div>
    <UDivider/>
    <div class="relative flex items-center gap-4">
      <UIcon v-if="previewURL" @click="cancelImage" class="absolute -top-[16px] left-[76px] size-8 hover:bg-red-500 hover:cursor-pointer" name="i-heroicons-x-circle-solid"/>
      <img :src="computedImageSrc" class="rounded-lg size-24" src="https://i.pravatar.cc/300" alt="">
      <div class="flex flex-col gap-2">
        <UInput @change="previewImage" type="file"/>
        <p class="text-xs text-gray-500">JPG, GIF, or PNG. 5MB max.</p>
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
    <div class="flex gap-4">
      <div v-for="tier in tiers" class="w-full p-4 border rounded-lg border-zinc-700 scBackground hover:bg-zinc-800">
        <div>{{ tier.name }}</div>
        <div>{{ tier.price }}</div>
      </div>
    
    </div>
    
    <div class="flex gap-4 mb-24 ml-auto">
      <UButton variant="ghost" label="Finish Later"/>
      <UButton @click="updateProfile" label="Finish Profile Setup"/>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const profileStore = useProfileStore();
const profile = ref({ pic: '' });

const previewURL = ref(null);
const selectedFile = ref(null);

const name = ref(profile.name);
const username = ref(profile.username);
const email = ref(profile.email);
const phone = ref(profile.phone);

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
  previewURL.value = null
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

console.log(computedImageSrc)

const profileComputed = computed(() => profile.value);

const tiers = [
  {
    name: "SongChart Free",
    price: "Free"
  },
  {
    name: "SongChart",
    price: "$2"
  },
  {
    name: "SongChart Pro",
    price: "$5"
  },
]
</script>