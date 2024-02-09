<template>
  <div class="scPage scBackground scBorder scRounded m-4 p-2 flex gap-2">
    <div class="w-full flex flex-col gap-4">
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
          @click="login()"
          >Login</UButton
        >
        <div class="flex gap-2">
          <div>Don't have an account yet?</div>
          <NuxtLink
            class="font-bold text-primary-600"
            to="/signup"
            >Register Here</NuxtLink
          >
        </div>
      </div>
    </div>
    <div class="w-full hidden md:flex">
      <img
        class="rounded h-72 w-full object-cover"
        src="../static/images/signinimg.jpg"
        alt="" />
    </div>
  </div>
</template>

<script setup>
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const profile = useProfileStore();
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
      console.log(data, "Signed In!");
      loading.value = false;
      profile.getProfile();
      navigateTo("/profile");
    }
  }
</script>

<style></style>
