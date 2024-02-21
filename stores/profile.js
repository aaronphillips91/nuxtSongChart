import { defineStore } from "pinia";

export const useProfileStore = defineStore({
  id: "ProfileStore",
  state: () => ({
    profile: null,
  }),
  actions: {
    async getProfile() {
      const client = useSupabaseClient();
      const user = useSupabaseUser();

      if (!user.value) {
        return;
      }

      const { data, error } = await client
        .from("profiles")
        .select("*")
        .eq("uuid", user.value.id);

      if (error) {
        console.error("Error fetching profile", error);
        return;
      }

      // Accessing store state using 'this'
      this.profile = data[0];
    },
    clearProfile() {
      // Accessing store state using 'this'
      console.log("Clearing profile");
      this.profile = null;
      console.log("Profile cleared");
    },
  },
  persist: true,
});
