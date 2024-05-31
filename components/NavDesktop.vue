<template>
  <nav
    class="hidden sm:flex max-w-7xl mb-2 justify-between mx-auto rounded-b-lg !border-t-0 scBorder scBackground p-2">
    <div class="flex items-center gap-8">
      <!--SongChart Icon-->
      <NuxtLink to="/">
        <img
          class="h-12 invert-0 dark:invert"
          src="../static/logos/SongChart Icon.svg"
          alt="" />
      </NuxtLink>
      <!--Navigation Links-->
      <div v-if="user" class="flex items-center gap-8 font-semibold">
        <NuxtLink
          tag="button"
          v-for="link in links"
          :to="link.path"
          class="p-2 rounded-lg hover:text-primary-600"
          >{{ link.name }}</NuxtLink
        >
      </div>
    </div>
    <!--Auth Avatar-->
    <div class="flex items-center" v-if="profile">
      <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
        <UAvatar
          class="size-12 scBorder"
          :src="profile.pic"
          alt="Avatar"
          size="lg" />
      </UDropdown>
    </div>
    <div class="flex items-center gap-2" v-else>
      <NuxtLink to="/Register">
        <UButton variant="ghost" label="Register" />
      </NuxtLink>
      <NuxtLink to="/login">
        <UButton label="Login" />
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const user = useSupabaseUser();
const useProfile = useProfileStore();
const profile = computed(() => useProfile.profile);
const authStore = useAuthStore();

const items = [
  [
    {
      label: "Profile",
      icon: "i-heroicons-user-circle-solid",
      click: () => {
        navigateTo("/profile");
      },
    },
  ],
  [
    {
      label: "Songs",
      icon: "i-heroicons-musical-note-16-solid",
      click: () => {
        navigateTo("/songs");
      },
    },
    {
      label: "Setlists",
      icon: "i-heroicons-queue-list-20-solid",
      click: () => {
        navigateTo("/setlists");
      },
    },
    {
      label: "ShowMode",
      icon: "i-heroicons-microphone-solid",
      click: () => {
        navigateTo("/showmode");
      },
    },
  ],
  [
    {
      label: "Sign Out",
      icon: "i-heroicons-arrow-right-start-on-rectangle",
      click: () => {
        authStore.signOut();
      },
    },
  ],
];

const links = [
  {
    name: "Songs",
    path: "/songs",
  },
  {
    name: "Setlists",
    path: "/setlists",
  },
  {
    name: "ShowMode",
    path: "/showmode",
  },
];
</script>

<style scoped>
.router-link-active {
  @apply text-primary-600 dark:text-primary-500;
}
</style>
