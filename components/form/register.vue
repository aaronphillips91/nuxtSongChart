<template>
  <div
    class="flex flex-col items-center justify-center w-full max-w-5xl gap-4 mx-auto">
    <img
      class="w-1/3 max-w-4xl"
      src="/logos/SongChart Logo.svg"
      alt="" />
    <h4>Register</h4>
    <div>
      <label for="email">Email</label>
      <UInput
        v-model="credentials.email.value"
        placeholder="email"
        icon="i-heroicons-envelope-solid"
        color="white"
        variant="outline" />
    </div>
    <div>
      <label for="password">Password</label>
      <UInput
        v-model="credentials.password.value"
        type="password"
        placeholder="password"
        icon="i-heroicons-lock-closed-solid"
        color="white"
        variant="outline" />
    </div>
    <UButton
      @click="authStore.signUp(credentials)"
      :loading="loading"
      type="password"
      label="Register" />
    <div class="text-xs">
      Already have an account?
      <ULink
        class="text-primary-500"
        to="/login">
        Login Here
      </ULink>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore();
const credentials = {
  email: ref(""),
  password: ref(""),
};
</script>
