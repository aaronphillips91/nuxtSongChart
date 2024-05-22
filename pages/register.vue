<template>

</template>

<script setup>
  const email = ref("");
  const password = ref("");
  const loading = ref(false);

  async function register() {
    const authStore = useAuthStore();
    const credentials = {
      email: email.value,
      password: password.value
    }
    loading.value = true;
    await authStore.signUp(credentials)
  }
</script>
