<template>
  <div
    class="flex gap-2 p-2 mt-2 border rounded-lg scBorder scPage scBackground">
    <img
      class="rounded size-32"
      :src="profile.pic"
      alt="" />
    <div class="flex flex-col justify-between w-full">
      <div class="flex items-center justify-between w-full">
        <div class="flex justify-between gap-2">
          <div class="flex flex-col gap-2">
            <h2>{{ profile.name }}</h2>
            <h4>@{{ profile.username }}</h4>
          </div>
        </div>
        <h4>Membership: {{ profile.sub_tier }}</h4>
        <UButton
          variant="ghost"
          @click="editProfile"
          class="self-start">
          Edit Profile
        </UButton>
      </div>
      <div class="flex gap-4 mx-auto">
        <div class="px-2 text-xs bg-red-800 border border-red-600 rounded-lg">
          Songs: 24
        </div>
        <div
          class="px-2 text-xs bg-orange-800 border border-orange-600 rounded-lg">
          Followers: 15
        </div>
        <div
          class="px-2 text-xs bg-yellow-800 border border-yellow-600 rounded-lg">
          Following: 42
        </div>
        <div
          class="px-2 text-xs bg-green-800 border border-green-600 rounded-lg">
          Setlists: 12
        </div>
        <div class="px-2 text-xs bg-blue-800 border border-blue-600 rounded-lg">
          ShowMode users: 20
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-2 mt-2 scPage">
    <div
      v-for="n in profButtons"
      class="flex w-full gap-2 p-2 border border-gray-700 rounded-lg bg-zinc-900">
      <UIcon
        class="size-8"
        :name="n.icon" />
      <div>{{ n.title }}</div>
      <div
        class="flex items-center justify-center ml-auto text-center align-middle rounded-lg bg-red-400/50 size-12">
        {{ n.count }}
      </div>
    </div>
  </div>

  <div
    class="flex flex-col gap-2 p-2 mt-2 border rounded-lg scBorder scPage scBackground">
    <div class="flex justify-between">
      <h4>My Songs</h4>
      <UButton variant="ghost">See All</UButton>
    </div>
    <div class="flex items-center gap-2 overflow-scroll">
      <div
        v-for="n in 12"
        class="flex items-center gap-2 p-2 border border-gray-700 rounded w-72 shrink-0 bg-white/5">
        <img
          class="rounded size-16 shrink-0"
          src="https://mtracks.azureedge.net/public/images/albums/260/7566.jpg"
          alt="" />
        <div class="flex flex-col">
          <div class="text-sm font-black">Song Title</div>
          <div class="text-xs font-semibold">Song Artist</div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="flex flex-col gap-2 p-2 mt-2 rounded-lg scBorder scPage scBackground">
    <div class="flex justify-between">
      <h4>My Setlists</h4>
      <UButton variant="ghost">See All</UButton>
    </div>
    <div class="flex items-center gap-2 overflow-scroll">
      <div
        v-for="n in 12"
        class="flex items-center gap-2 p-2 border border-gray-700 rounded w-72 shrink-0 bg-white/5">
        <img
          class="rounded size-16"
          src="https://mtracks.azureedge.net/public/images/albums/260/2020.jpg"
          alt="" />
        <div class="flex flex-col">
          <div class="text-sm font-black">Setlist Name</div>
          <div class="text-xs font-semibold">Date</div>
        </div>
      </div>
    </div>
  </div>

  <button
    class="mx-auto bg-red-500"
    @click="logout">
    Logout
  </button>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

onMounted(() => {
  const profileStore = useProfileStore();
  profileStore.getProfile();
});

const profileStore = useProfileStore();
const profile = ref(profileStore.profile);

const logout = () => {
  const auth = useAuthStore();
  auth.signOut();
};

const editProfile = () => {
  navigateTo("/profile/edit");
};

const profButtons = [
  {
    title: "Collaborations",
    icon: "i-heroicons-light-bulb-solid",
    count: 4,
  },
  {
    title: "Messages",
    icon: "i-heroicons-chat-bubble-bottom-center-text-solid",
    count: 4,
  },
  {
    title: "Notifications",
    icon: "i-heroicons-bell-alert-solid",
    count: 2,
  },
];
</script>
