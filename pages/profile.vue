<template>
  <div
    v-if="profile"
    class="flex gap-4 p-2 mt-2 border rounded-lg scPage scBackground scBorder scRounded">
    <img
      class="rounded-full size-24 scBorder"
      :src="profile.pic"
      alt="" />
    <div class="flex flex-col justify-center w-full">
      <h1 class="line-clamp-1">
        {{ profile.username }}
      </h1>
      <p class="line-clamp-1">{{ profile.contact_email }}</p>
    </div>
    <UDropdown
      class="h-fit"
      :items="items"
      :popper="{ placement: 'bottom-end' }">
      <UButton
        class="items-center justify-center size-8"
        color="gray"
        square
        icon="i-heroicons-pencil-square-solid" />
    </UDropdown>
  </div>
  <div
    v-else
    class="flex gap-4 p-2 mt-2 border rounded-lg scPage scBackground scBorder scRounded">
    Loading User Profile...
  </div>
  <div
    v-if="profile"
    class="flex flex-col gap-4 p-2 mt-2 border rounded-lg scPage scBackground scBorder scRounded">
    <div class="flex flex-col">
      <h1>Hello {{ profile.username }}</h1>
      <h3>Here's some information about your profile:</h3>
    </div>
    <div>UUID: {{ profile.uuid }}</div>
    <div>username: {{ profile.username }}</div>
    <div>Contact Email: {{ profile.contact_email }}</div>
    <div>Contact Phone: {{ profile.contact_phone }}</div>
    <div>Profile Pic URL: {{ profile.pic }}</div>
    <div>sub_tier: {{ profile.sub_tier }}</div>
    <div>Setup Complete? {{ profile.setup_complete }}</div>
  </div>

  <UModal v-model="editProfileModal">
    <div class="flex flex-col gap-4 p-4">
      <h1>Edit Profile</h1>
      <div>
        <label for="username">Username</label>
        <UInput type="text" size="md" icon="i-heroicons-user-circle-solid" v-model="editedUsername" />
      </div>
      <div>
        <label for="contact_email">Contact email</label>
        <UInput type="text" size="md" icon="i-heroicons-envelope-solid" v-model="editedContactEmail" />
      </div>
      <div>
        <label for="contact_phone">Contact phone</label>
        <UInput type="text" size="md" icon="i-heroicons-phone-solid" v-model="editedContactPhone" />
      </div>
      <scButton @click="updateProfile" class="ml-auto" text="Update Profile"/>
    </div>
  </UModal>

  <UModal v-model="manageMembershipModal">
    <div class="flex flex-col gap-4 p-4">
      <h1>Manage SongChart Membership</h1>
      <div class="flex flex-wrap justify-center gap-2">
        <div v-for="option in tierOptions" class="flex flex-col items-center w-full gap-2 p-4 text-sm border rounded-lg cursor-pointer bg-white/5 border-white/10 hover:bg-white/15">
          <div class="flex justify-between w-full">
            <h3>{{ option.title }}</h3>
            <div class="text-sm font-black">{{ option.price }}</div>
          </div>
          <div class="text-xs text-white/70">{{ option.description }}</div>
        </div>
      </div>
      <scButton @click="updateProfile" class="ml-auto" text="Save Membership"/>
    </div>
  </UModal>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const client = useSupabaseClient();
const useProfile = useProfileStore();
const profile = computed(() => useProfile.profile);

const editedUsername = ref(profile.value.username);
const editedContactEmail = ref(profile.value.contact_email);
const editedContactPhone = ref(profile.value.contact_phone);

const editProfileModal = ref(false);
const manageMembershipModal = ref(false);

const items = [
  [
    {
      label: "Edit Profile",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        editProfileModal.value = true;
        editedUsername.value = profile.value.username;
        editedContactEmail.value = profile.value.contact_email;
        editedContactPhone.value = profile.value.contact_phone;
      },
    },
  ],
  [
    {
      label: "Manage Membership",
      icon: "i-heroicons-queue-list-20-solid",
      click: () => {
        manageMembershipModal.value = true;

      }
    },
    {
      label: "Open ShowMode",
      icon: "i-heroicons-microphone-20-solid",
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-heroicons-arrow-right-start-on-rectangle-solid",
      click: () => {
        signout();
      },
    },
  ],
];

const tierOptions = [
  {
    title: 'SongChart Free',
    description: 'Everything you need to get familiar with charting songs and building setlists. Limited to 3 songs and 1 setlist',
    price: 'Free'
  },
  {
    title: 'SongChart',
    description: 'All the essentials for charting songs, building setlists, and printing chord charts. No limits for songs or setlists',
    price: '$5/month'
  },
  {
    title: 'SongChart Pro',
    description: 'The whole package. Chart songs, build setlists, print chord charts, AND access to ShowMode, a dynamic, midi controlled chord chart display app for iPhone and iPad.',
    price: '$7/month'
  }
]

async function signout() {
  const { error } = await client.auth.signOut();
  if (error) {
    console.error(error);
  } else {
    console.log("signed out");
    useProfile.clearProfile();
    navigateTo("/login");
  }
}

async function updateProfile() {
  await useProfile.updateProfile({
    username: editedUsername.value,
    contact_email: editedContactEmail.value,
    contact_phone: editedContactPhone.value,
  });
  editProfileModal.value = false;
  await useProfile.getProfile();
}

// Watch for changes in the profile to update the edited fields
watch(profile, (newProfile) => {
  if (newProfile) {
    editedUsername.value = newProfile.username;
    editedContactEmail.value = newProfile.contact_email;
    editedContactPhone.value = newProfile.contact_phone;
  }
});
</script>

<style></style>