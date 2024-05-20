<template>
  <div class="flex gap-4 p-2 mt-2 border rounded-lg scPage scBackground scBorder scRounded">
    <div class="flex gap-4 mx-auto">
      <img class=" dark:invert" src="/static/logos/Songchart Icon.svg" alt="">
      <div class="flex flex-col">
        <h1 class=" text-nowrap">Welcome to the SongChart family!</h1>
        <div class="font-bold">Let's get your profile set up.</div>
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-4 p-2 mt-2 border rounded-lg scPage scBackground scBorder scRounded">
    <h3>We'll start with the basics</h3>
    <UDivider></UDivider>
    <div class="flex items-center gap-2">
      <UIcon class="opacity-30 size-20 shrink-0" name="i-heroicons-user-circle-solid"/>
      <div class="">
        <div class="">
          <label for="username">Username</label>
          <UInput
            :loading="loading"
            v-model="newUsername"
            type="text"
            required />
        </div>
        <h4 class="mt-2 text-xs font-medium ">Pick a unique username. This can be your artist name, nickname, label name, or just your name. </h4>
      </div>
    </div>
    <UDivider></UDivider>
    <div class="flex items-center gap-2">
      <UIcon class="opacity-30 size-20 shrink-0" name="i-heroicons-envelope-solid"/>
      <div>
    
    <div class="">
      <label for="contact_email">Contact email</label>
      <UInput
        :loading="loading"
        v-model="newContactEmail"
        type="text"
        required />
        </div>
        <h4 class="mt-2 text-xs font-medium ">The default is your login email, but if you'd prefer to get communication to a different email address you can change it here. </h4>
        </div>
    </div>
    <UDivider></UDivider>
    <div class="flex items-center gap-2">
      <UIcon class="opacity-30 size-20 shrink-0" name="i-heroicons-phone-solid"/>
      <div>
    <div class="">
      <label for="contact_phone">Contact phone</label>
      <UInput
        :loading="loading"
        v-model="newContactPhone"
        type="text"
        required />
    </div>
    <h4 class="mt-2 text-xs font-medium ">If you'd like to collaborate with other artists, this will give them a number to text or call.  You can leave this blank if you'd prefer to only communicate through email. </h4>
    </div>
    </div>
    <UDivider></UDivider>
    <uButton @click="createProfile" class="px-8 ml-auto">Create my Profile</uButton>
  </div>
</template>

<script setup>
const useProfile = useProfileStore();
const profile = computed(() => useProfile.profile);

const newUsername = ref(profile.username)
const newContactEmail = ref(profile.contact_phone)
const newContactPhone = ref(profile.contact_email)

watch(profile, (newProfile) => {
  newUsername.value = newProfile.username;
  newContactEmail.value = newProfile.contact_email;
  newContactPhone.value = newProfile.contact_phone;
}, { immediate: true });

const createProfile = () => {
  console.log(newUsername.value)
}


</script>

<style></style>
