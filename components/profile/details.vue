<template>
  <h1>Account Details</h1>
  <div class="flex flex-col gap-4">
    <BaseCard class="flex items-center w-full gap-4">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-4">
          <img
            :src="profile.pic"
            class="rounded-lg size-24"
            alt="" />
          <div>
            <h4>{{ profile.first_name }} {{ profile.last_name }}</h4>
            <p>{{ profile.bio }}</p>
          </div>
        </div>
        <UButton
          @click="picEdit = !picEdit"
          variant="outline"
          class="self-start"
          label="Edit" />
      </div>
    </BaseCard>
    <BaseCard class="flex flex-col items-center w-full gap-4">
      <div class="flex items-center justify-between w-full">
        <h4>Personal Information</h4>
        <UButton
          @click="personalInfoEdit = !personalInfoEdit"
          variant="outline"
          label="Edit" />
      </div>
      <div class="flex w-full gap-4 px-4 py-2">
        <div class="flex flex-col w-full">
          <label
            class="text-zinc-500"
            for="firstName">
            First name
          </label>
          <div v-if="!personalInfoEdit">{{ profile.first_name }}</div>
          <UInput
            v-else
            v-model="profile.first_name" />
        </div>
        <div class="flex flex-col w-full">
          <label
            class="text-zinc-500"
            for="lastName">
            Last name
          </label>
          <div v-if="!personalInfoEdit">{{ profile.last_name }}</div>
          <UInput
            v-else
            v-model="profile.last_name" />
        </div>
      </div>
      <div class="flex w-full gap-4 px-4 py-2">
        <div class="flex flex-col w-full">
          <label
            class="text-zinc-500"
            for="firstName">
            Contact email
          </label>
          <div v-if="!personalInfoEdit">{{ profile.email }}</div>
          <UInput
            v-else
            v-model="profile.email" />
        </div>
        <div class="flex flex-col w-full">
          <label
            class="text-zinc-500"
            for="lastName">
            Contact phone
          </label>
          <div v-if="!personalInfoEdit">{{ profile.phone }}</div>
          <UInput
            v-else
            v-model="profile.phone" />
        </div>
      </div>
      <div class="flex w-full gap-4 px-4 py-2">
        <div class="flex flex-col w-full">
          <label
            class="text-zinc-500"
            for="firstName">
            Bio
          </label>
          <div v-if="!personalInfoEdit">{{ profile.bio }}</div>
          <UInput
            v-else
            v-model="profile.bio" />
        </div>
        <div class="flex flex-col w-full">
          <label
            class="text-zinc-500"
            for="lastName">
            Username
          </label>
          <div v-if="!personalInfoEdit">{{ profile.username }}</div>
          <UInput
            v-else
            v-model="profile.username" />
        </div>
      </div>
    </BaseCard>
    <BaseCard class="flex flex-col items-center w-full gap-4">
      <div class="flex items-center justify-between w-full">
        <h4>Address</h4>
        <UButton
          @click="addressEdit = !addressEdit"
          variant="outline"
          label="Edit" />
      </div>
      <div class="flex w-full gap-4 px-4 py-2">
        <div class="flex flex-col w-full">
          <label
            class="text-zinc-500"
            for="firstName">
            Country
          </label>
          <div v-if="!addressEdit">{{ profile.country }}</div>
          <UInput
            v-else
            v-model="profile.country" />
        </div>
        <div class="flex flex-col w-full">
          <label
            class="text-zinc-500"
            for="lastName">
            City/State
          </label>
          <div v-if="!addressEdit">{{ profile.city_state }}</div>
          <UInput
            v-else
            v-model="profile.city_state" />
        </div>
      </div>
      <div class="flex w-full gap-4 px-4 py-2">
        <div class="flex flex-col w-full">
          <label
            class="text-zinc-500"
            for="firstName">
            Postal
          </label>
          <div v-if="!addressEdit">{{ profile.postal }}</div>
          <UInput
            v-else
            v-model="profile.postal" />
        </div>
      </div>
    </BaseCard>
    <BaseCard class="flex flex-col items-center w-full gap-4">
      <div class="flex items-center justify-between w-full">
        <h4>Subscription</h4>
        <UButton
          @click="addressEdit = !addressEdit"
          variant="outline"
          label="Manage Subscription" />
      </div>
      <div class="flex items-center w-full gap-4 px-4 py-2">
        <img
          src="/public/logos/SCPlus.png"
          alt="" />
        <div class="flex flex-col">
          <h4>{{ profile.sub_tier }}</h4>
          <h5 class="text-zinc-500">$3 / month</h5>
        </div>
      </div>
    </BaseCard>
    <BaseCard class="flex flex-col items-center w-full gap-4">
      <div class="flex flex-col justify-between w-full">
        <h4>Security</h4>
        <div>
          Your account's security is our top priority. To ensure your
          information remains safe, you can update your password at any time.
        </div>
      </div>
      <div class="flex items-center w-full gap-4 px-4 py-2">
        <div class="flex flex-col mr-24">
          <label
            class="text-zinc-500"
            for="firstName">
            Password
          </label>
          <div>************</div>
        </div>
        <div class="flex flex-col text-nowrap">
          <UButton
            variant="outline"
            color="danger"
            label="Change Password" />
        </div>
        <div class="text-sm text-zinc-500">
          For your protection, changing your password will require email
          verification. Click the button to start the process.
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
const { profile } = defineProps(["profile"]);
const picEdit = ref(false);
const personalInfoEdit = ref(false);
const addressEdit = ref(false);
</script>

<style></style>
