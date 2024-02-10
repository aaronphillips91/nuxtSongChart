<template>
  <nav
    class="hidden sm:flex max-w-7xl justify-between mx-auto rounded-b-lg !border-t-0 scBorder scBackground p-2">
    <!--SongChart Icon-->
    <NuxtLink to="/">
      <img
        class="h-12 invert-0 dark:invert"
        src="../static/logos/SongChart Icon.svg"
        alt="" />
    </NuxtLink>
    <!--Navigation Links-->
    <div
      v-if="user"
      class="flex items-center gap-8 font-semibold">
      <NuxtLink
        tag="button"
        v-for="link in links"
        :to="link.path"
        class="p-2 rounded-lg hover:text-primary-600"
        >{{ link.name }}</NuxtLink
      >
    </div>
    <!--Auth Avatar-->
    <NuxtLink
      v-if="useProfile.profile"
      to="/profile"
      class="size-12">
      <UAvatar
        class="size-12 scBorder"
        :src="profile.profile.pic"
        :alt="user.email"
        size="lg" />
    </NuxtLink>
    <NuxtLink
      v-else
      to="/login"
      class="size-12">
      <UAvatar
        class="size-12 scBorder"
        icon="i-heroicons-user-solid"
        alt="Avatar"
        size="lg" />
    </NuxtLink>
  </nav>
</template>

<script setup>
  const user = useSupabaseUser();
  const useProfile = useProfileStore();

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
    {
      name: "Tutorials",
      path: "/tutorials",
    },
  ];
</script>

<style scoped>
  .router-link-active {
    @apply text-primary-600 dark:text-primary-500 bg-neutral-500/5;
  }
</style>
