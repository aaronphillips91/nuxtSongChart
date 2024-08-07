<template>
  <nav
    class="hidden select-none sm:flex max-w-7xl mb-2 justify-between w-full rounded-b-lg !border-t-0 scBorder scBackground p-2">
    <div class="flex items-center gap-8">
      <!--SongChart Icon-->
      <NuxtLink to="/">
        <img
          class="h-12 invert-0 dark:invert"
          src="/logos/Songchart Icon.svg"
          alt="" />
      </NuxtLink>
      <!--Navigation Links-->
      <div
        v-if="user"
        class="flex items-center gap-8 font-semibold">
        <NuxtLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="p-2 rounded-lg"
          v-slot="{ isActive }">
          <span
            :class="
              isActive
                ? 'text-primary-600 dark:text-primary-500'
                : 'hover:text-primary-600'
            ">
            {{ link.name }}
          </span>
        </NuxtLink>
      </div>
    </div>
    <!--Auth Avatar-->
    <div
      class="flex items-center"
      v-if="profile">
      <UDropdown
        :items
        :popper="{ placement: 'bottom-end' }">
        <UAvatar
          class="size-12 scBorder"
          :src="profile.pic"
          alt="Avatar"
          size="lg" />
      </UDropdown>
    </div>
    <div
      class="flex items-center gap-2"
      v-else>
      <UButton
        to="/register"
        variant="ghost"
        label="Register" />
      <UButton
        to="/login"
        label="Login" />
    </div>
  </nav>
</template>

<script setup>
const user = ref(null);
const profileStore = useProfileStore();
const profile = computed(() => profileStore.profile);
const authStore = useAuthStore();

const isLoggedIn = ref(false);

onBeforeMount(async () => {
  isLoggedIn.value = await authStore.setUser;
  user.value = computed(() => useSupabaseeUser());
});

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
