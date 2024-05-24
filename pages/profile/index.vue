<template>
  <button class="mx-auto bg-red-500" @click="logout">Logout</button>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const logout = () => {
  const auth = useAuthStore()
  auth.signOut()
}
</script>
