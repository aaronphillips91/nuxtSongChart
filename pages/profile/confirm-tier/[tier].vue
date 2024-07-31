<template>
  <div>Confirm you want to change your tier here</div>
  <div>Selected Tier: {{ $route.params.tier || "tier" }}</div>
</template>

<script setup>
//use route parameters to get the tier name
const route = useRoute();

console.log("The tier being logged is: ", route.params.tier);

function checkTier() {
  if (route.params.tier === "SongChart Free") {
    console.log("Free tier");
  } else if (route.params.tier === "SongChart Plus") {
    console.log("Plus tier");
  } else if (route.params.tier === "SongChart Pro") {
    console.log("Pro tier");
  } else {
    navigateTo("/profile");
  }
}

checkTier();
</script>

<style></style>
