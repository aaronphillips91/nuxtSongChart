<template>
  <div class="w-screen max-w-7xl">
    <setlistsHeader />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
