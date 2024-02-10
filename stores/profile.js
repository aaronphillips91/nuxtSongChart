import { defineStore } from "pinia";

export const useProfileStore = defineStore({
  id: "ProfileStore",
  state: () => ({
    profile: {},
  }),
  actions: {
    async getProfile() {
      const client = useSupabaseClient();
      const user = useSupabaseUser();
      const { data, error } = await client
        .from("profiles")
        .select("*")
        .eq("uuid", user.value.id);
      if (error) {
        console.log("Error fetching profile", error);
        return;
      } else {
        this.profile = data[0];
      }
    },
    async clearProfile() {
      this.profile = null;
    },
  },
  persist: true,
});
