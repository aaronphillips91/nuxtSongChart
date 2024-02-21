<template>
  <div
    v-if="profile"
    class="flex gap-4 p-2 mt-2 border rounded-lg scPage scBackground scBorder scRounded">
    <img
      class="rounded-full size-24 scBorder"
      :src="profile.pic"
      alt="" />
    <div class="flex flex-col justify-center w-full">
      <h1 class="line-clamp-1">
        {{ profile.username }}
      </h1>
      <p class="line-clamp-1">{{ profile.contact_email }}</p>
    </div>
    <UDropdown
      class="h-fit"
      :items="items"
      :popper="{ placement: 'bottom-end' }">
      <UButton
        class="items-center justify-center size-8"
        color="gray"
        square
        icon="i-heroicons-pencil-square-solid" />
    </UDropdown>
  </div>
  <div
    v-else
    class="flex gap-4 p-2 mt-2 border rounded-lg scPage scBackground scBorder scRounded">
    Loading User Profile...
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: "auth",
  });

  const client = useSupabaseClient();
  const useProfile = useProfileStore();
  const profile = useProfile.profile;
  const user = useSupabaseUser();

  const items = [
    [
      {
        label: "Edit Profile",
        icon: "i-heroicons-pencil-square-20-solid",
        click: () => {
          console.log("Edit");
        },
      },
    ],
    [
      {
        label: "Manage Membership",
        icon: "i-heroicons-queue-list-20-solid",
      },
      {
        label: "Open ShowMode",
        icon: "i-heroicons-microphone-20-solid",
      },
    ],
    [
      {
        label: "Logout",
        icon: "i-heroicons-arrow-right-start-on-rectangle-solid",
        click: () => {
          signout();
        },
      },
    ],
  ];

  async function signout() {
    const { error } = await client.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      console.log("signed out");
      useProfile.clearProfile();
      navigateTo("/login");
    }
  }
</script>

<style></style>
