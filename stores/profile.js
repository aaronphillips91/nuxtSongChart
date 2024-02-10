export const useProfileStore = defineStore({
  id: "ProfileStore",
  state: () => ({
    profile: null,
  }),
  actions: {
    getProfile: async () => {
      const client = useSupabaseClient();
      const user = useSupabaseUser();
      console.log(user.value)
      if (!user) {
        return;
      }

      const { data, error } = await client
        .from("profiles")
        .select("*")
        .eq("uuid", user.value.id);

      if (error) {
        console.log("Error fetching profile", error);
        return;
      } else {
        this.profile = data[0]; // Now using arrow function syntax
      }
    },
    clearProfile: () => {
      this.profile = null; // Now using arrow function syntax
    },
  },
  persist: true,
});