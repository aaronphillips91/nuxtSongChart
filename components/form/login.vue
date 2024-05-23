<template>
  
    <div class="flex flex-col items-center justify-center w-full max-w-5xl gap-4 mx-auto">
      <img class="w-1/3 max-w-4xl " src="/static/logos/SongChart Logo.svg" alt="">

      <div>
        <label for="email">Email</label>
        <UInput placeholder="email" icon="i-heroicons-envelope-solid" color="white" variant="outline"/>
      </div>
      <div>
        <label for="password">Password</label>
        <UInput placeholder="password" icon="i-heroicons-lock-closed-solid" color="white" variant="outline"/>
      </div>
      <UButton @click="login" :loading="loading" label="Login" />
      <div class="text-xs">Don't have an account? <ULink class="text-primary-500" to="/register">Register Here</ULink></div>
    </div>
</template>

<script setup>
  const email = ref("");
  const password = ref("");
  const loading = ref(false);

  async function login() {
    const authStore = useAuthStore();
    const credentials = {
      email: email.value,
      password: password.value
    }
    loading.value = true;
    await authStore.signIn(credentials)
  }
</script>