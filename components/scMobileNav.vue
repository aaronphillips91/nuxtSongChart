<template>
  <section
    class="flex sm:hidden w-full justify-between fixed bottom-0 z-10 p-4 !border-x-0 !border-b-0 scBorder scBackground">
  </section>
</template>

<script setup>
  const user = useSupabaseUser()
  function handleRegister() {
    navigateTo("/signup");
  }
  function handleLogin() {
    navigateTo("/login");
  }
</script>

<style></style>
