export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useSupabaseUser();

  if (!user.value) {
    return navigateTo("/login");
  }
});
