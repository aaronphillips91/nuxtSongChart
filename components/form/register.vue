<template>
<div class="flex flex-col items-center justify-center w-full max-w-5xl gap-4 mx-auto">
      
  <img class="w-1/3 max-w-4xl " src="/static/logos/SongChart Logo.svg" alt="">

      <div>
        <label for="email">Email</label>
        <UInput v-model="email" placeholder="email" icon="i-heroicons-envelope-solid" color="white" variant="outline"/>
      </div>
      <div>
        <label for="password">Password</label>
        <UInput v-model="password" type="password" placeholder="password" icon="i-heroicons-lock-closed-solid" color="white" variant="outline"/>
      </div>
      <UButton @click="register" :loading="loading" type="password" label="Register" />
      <div class="text-xs">Already have an account? <ULink class="text-primary-500" to="/login">Login Here</ULink></div>
    </div>
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
    loading.value = false;
  }
</script>