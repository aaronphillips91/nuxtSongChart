<template>
  <div class="flex flex-col w-screen gap-2 px-2 pt-2 sm:pt-0 xl:px-0 max-w-7xl">
    <HeaderProfile
      @activeTab="handleActiveTab"
      :profile />
    <ProfileSongs
      :profile
      v-if="activeTab === 'mySongs'" />
    <ProfileCollaborations
      :profile
      v-if="activeTab === 'collaborations'" />
    <ProfileDetails
      :profile
      v-if="activeTab === 'details'" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const activeTab = ref("mySongs");

onMounted(() => {
  const profileStore = useProfileStore();
  profileStore.getProfile();
});

const profileStore = useProfileStore();
const profile = ref(profileStore.profile);

const editProfile = () => {
  navigateTo("/profile/edit");
};

const handleActiveTab = (value) => {
  activeTab.value = value;
};
</script>
