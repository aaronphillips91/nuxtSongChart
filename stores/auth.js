import { defineStore } from "pinia";
import { useProfileStore } from "./profile";

export const useAuthStore = defineStore({
  id: "AuthStore",
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  actions: {
    //Signs the user up with an account using Supabase Auth. Also creates a profile and sends the user to /profile/setup.
    async signUp(credentials) {
      this.loading = true;
      const toast = useToast();
      const supabase = useSupabaseClient();
      const profileStore = useProfileStore();
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email.value,
        password: credentials.password.value,
      });
      if (error) {
        console.error("Error: ", error.message);
        toast.add({ title: error.message });
        this.loading = false;
      } else {
        this.user = data.user;
        await profileStore.createProfile(data.user);
        this.loading = false;
        navigateTo("/profile/setup");
      }
    },
    //Signs the user in with their login credentials using Supabase Auth. Sends the user to /songs.
    async signIn(credentials) {
      this.loading = true;
      const toast = useToast();
      const supabase = useSupabaseClient();
      const profileStore = useProfileStore();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email.value,
        password: credentials.password.value,
      });
      if (error) {
        console.error("Error: ", error.message);
        toast.add({ title: error.message, color: "red" });
        this.loading = false;
      } else {
        this.user = data.user;
        await profileStore.getProfile();
        this.loading = false;
        toast.add({ title: `Welcome back!`, color: "primary" });
        if (profileStore.profile.setup_complete === true) {
          navigateTo("/songs");
        } else {
          navigateTo("/profile/setup");
        }
      }
    },
    //Signs the current user out using Supabase Auth. Sends the user to /login.
    async signOut() {
      const supabase = useSupabaseClient();
      const profileStore = useProfileStore();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error: ", error.message);
      } else {
        this.user = null;
        profileStore.clearProfile();
        navigateTo("/login");
      }
    },
    //Checks if the current user is logged in using Supabase Auth.
    async setUser() {
      const currentUser = useSupabaseUser();
      this.user = currentUser.value;
    },
  },
  persist: true,
});
