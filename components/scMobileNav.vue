<template>
  <section
    class="flex sm:hidden w-full justify-between fixed bottom-0 z-10 p-4 !border-x-0 !border-b-0 scBorder scBackground">
    <NuxtLink
      v-if="!user"
      to="/">
      <img
        class="h-8 invert dark:invert-0"
        src="../static/logos/SongChart Logo.svg"
        alt="link" />
    </NuxtLink>
    <NuxtLink
      v-if="user"
      to="/">
      <img
        class="h-8 invert dark:invert-0"
        src="../static/icons/SongChartIcon.svg"
        alt="link" />
    </NuxtLink>
    <NuxtLink
      v-if="user"
      to="/songs">
      <img
        class="h-8 invert dark:invert-0"
        src="../static/icons/SongsIcon.svg"
        alt="link" />
    </NuxtLink>
    <NuxtLink
      v-if="user"
      to="/setlists">
      <img
        class="h-8 invert dark:invert-0"
        src="../static/icons/SetlistIcon.svg"
        alt="link" />
    </NuxtLink>
    <NuxtLink
      v-if="user"
      to="/showmode">
      <img
        class="h-8 invert dark:invert-0"
        src="../static/icons/ShowModeIcon.svg"
        alt="link" />
    </NuxtLink>
    <NuxtLink
      v-if="user"
      to="/tutorials">
      <img
        class="h-8 invert dark:invert-0"
        src="../static/icons/TutorialsIcon.svg"
        alt="link" />
    </NuxtLink>
    <NuxtLink
      v-if="user"
      to="/profile">
      <img
        class="h-8 invert dark:invert-0"
        src="../static/icons/ProfileIcon.svg"
        alt="link" />
    </NuxtLink>
    <div
      v-if="!user"
      class="flex gap-2">
      <UButton @click="handleRegister">Register</UButton>
      <UButton @click="handleLogin">Login</UButton>
    </div>
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
</script>

<style></style>
