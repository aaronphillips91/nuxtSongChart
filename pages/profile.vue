<template>
  <div
    v-if="profile"
    class="scPage scBackground scBorder scRounded border rounded-lg p-2 mt-2 flex gap-4">
    <img
      class="size-24 rounded-full scBorder"
      :src="profile.pic"
      alt="" />
    <div class="flex flex-col w-full justify-center">
      <h1 class="line-clamp-1">
        {{ profile.username }}
      </h1>
      <p>{{ profile.contact_email }}</p>
    </div>
    <UDropdown
      class="h-fit"
      :items="items"
      :popper="{ placement: 'bottom-end' }">
      <UButton
        class="size-8 items-center justify-center"
        color="gray"
        square
        icon="i-heroicons-pencil-square-solid" />
    </UDropdown>
  </div>
  <div class="scPage my-8 justify-end flex">
    <UButton
      class="ml-auto"
      @click="signout()"
      >Logout</UButton
    >
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: "auth",
  })

  const client = useSupabaseClient();
  const useProfile = useProfileStore();
  const profile = useProfile.profile
  const user = useSupabaseUser();
  async function signout() {
    const { error } = await client.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      console.log("signed out");
      profile.clearProfile();
      navigateTo("/login");
    }
  }
</script>

<style></style>
