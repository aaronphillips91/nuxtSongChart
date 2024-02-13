<template>
  <div class="flex gap-2 p-2 m-4 scPage scBackground scBorder scRounded">
    <div class="flex flex-col w-full gap-4">
      <h1>Login to SongChart</h1>
      <div class="">
        <label for="email">email</label>
        <UInput
          :loading="loading"
          v-model="email"
          type="email"
          required />
      </div>
      <div class="">
        <label for="password">password</label>
        <UInput
          :loading="loading"
          v-model="password"
          type="password"
          required />
      </div>
      <div class="text-sm text-red-500">
        {{ errorMsg }}
      </div>
      <div class="flex flex-col gap-4">
        <UButton
          block
          :loading="loading"
          class="transition-colors duration-150"
          @click="login()"
          >Login</UButton
        >
        <div class="flex gap-2">
          <div>Don't have an account yet?</div>
          <NuxtLink
            class="font-bold text-primary-500 hover:text-primary-600 transition-colors duration-150"
            to="/signup"
            >Register Here</NuxtLink
          >
        </div>
      </div>
    </div>
    <div class="hidden w-full md:flex">
      <img
        class="object-cover w-full rounded h-72"
        src="../static/images/signinimg.jpg"
        alt="" />
    </div>
  </div>
</template>

<script setup>
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const useProfile = useProfileStore();
  const email = ref("");
  const password = ref("");
  const loading = ref(false);
  const errorMsg = ref(null);

  async function login() {
    loading.value = true;
    const { data, error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) {
      console.error(error);
      errorMsg.value = error.message;
      loading.value = false;
    } else {
      errorMsg.value = null;
      email.value = "";
      password.value = "";
      loading.value = false;
      await useProfile.getProfile();
      navigateTo("/profile");
    }
  }
</script>

<style></style>
