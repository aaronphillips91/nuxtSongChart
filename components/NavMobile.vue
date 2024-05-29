<template>
  <section
    class="flex sm:hidden w-full justify-around fixed bottom-0 z-10 p-4 !border-x-0 !border-b-0 scBorder scBackground">
    <NuxtLink
      class="flex flex-col items-center justify-center"
      :to="link.path"
      v-for="link in links">
      <img
        v-if="link.logo"
        class="opacity-50 size-10 dark:invert"
        src="../static/logos/SongChart Icon.svg"
        alt="" />
      <UIcon
        v-if="link.icon"
        :name="link.icon"
        class="size-6 text-neutral-500" />
      <span v-if="link.name" class="text-xs text-neutral-500">{{
        link.name
      }}</span>
    </NuxtLink>
  </section>
</template>

<script setup>
const user = useSupabaseUser();
function handleRegister() {
  navigateTo("/signup");
}
function handleLogin() {
  navigateTo("/login");
}

const links = [
  {
    name: "Songs",
    icon: "i-heroicons-musical-note-16-solid",
    path: "/songs",
  },
  {
    name: "Setlists",
    icon: "i-heroicons-queue-list-20-solid",
    path: "/setlists",
  },
  {
    logo: true,
    path: "/",
  },
  {
    name: "ShowMode",
    icon: "i-heroicons-microphone-solid",
    path: "/showmode",
  },
  {
    name: "Profile",
    icon: "i-heroicons-user-circle-solid",
    path: "/profile",
  },
];
</script>

<style></style>
