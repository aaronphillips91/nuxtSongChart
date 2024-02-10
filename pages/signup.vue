<template>
  <div class="flex gap-2 p-2 m-4 scPage scBackground scBorder scRounded">
    <div class="flex flex-col w-full gap-4">
      <h1>Create a SongChart Account</h1>
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
      <div class="">
        <label for="password">confirm password</label>
        <UInput
          :loading="loading"
          v-model="confirmPassword"
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
          @click="handleRegister()"
          >Login</UButton
        >
        <div class="flex gap-2">
          <div>Already Have An Account??</div>
          <NuxtLink
            class="font-bold text-primary-600"
            to="/login"
            >Login Here</NuxtLink
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
  const confirmPassword = ref("");
  const loading = ref(false);
  const errorMsg = ref(null);

  function handleRegister() {
    if (password.value == confirmPassword.value && email.value != "") {
      register();
    } else {
      errorMsg.value = "Passwords do not match or email is blank";
    }
  }

  async function register() {
    loading.value = true;
    const { data, error } = await client.auth.signUp({
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
      confirmPassword.value = "";
      await useProfile.getProfile();
      loading.value = false;
      navigateTo("/createprofile");
    }
  }
</script>

<style></style>
