<template>
  <div class="flex gap-2 p-2 m-4 h-fit scPage scBackground scBorder scRounded">
    <div class="flex flex-col w-full gap-4 h-fit">
      <h1>Create a SongChart Account</h1>
      <div class="flex flex-col gap-4">
        <scButton full text="Hello"/>
        <div>
          <label for="email">email</label>
          <UInput type="text" size="md" icon="i-heroicons-envelope" :model-value=email />
        </div>
        <div>
          <label for="password">password</label>
          <UInput type="text" size="md" icon="i-heroicons-lock-closed" :model-value=password />
        </div>
        <UButton label="Sign Up" block variant="soft"/>
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
    <div class="hidden w-full md:flex h-fit">
      <img
        class="object-cover w-full rounded h-fit"
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
