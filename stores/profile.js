import { defineStore } from "pinia";

export const useProfileStore = defineStore({

  id: "ProfileStore",
  state: () => ({
    profile: null,
  }),

  actions: {
    //Creates a user profile when the user registers.  This is only called upon registration.
    async createProfile(user) {
      const supabase = useSupabaseClient();
      const { error } = await supabase
      .from("profile")
      .insert({
        email: user.email,
        sub_tier: 'SongChart Free',
      })
    },
    //Fetches the profile using the logged in user's uuid.
    async getProfile() {
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();
      if (!user.value) {
        return;
      };
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("uuid", user.value.id);
      if (error) {
        console.error("Error fetching profile", error);
        return;
      }
      this.profile = data[0];
    },
    //Updates the profile table on the currently logged in user.  Accepts an object.
    async updateProfile(userData) {
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();
      if (!user.value) {
        return;
      };
      const { error } = await supabase 
        .from('profile')
        .update(userData)
        .eq('uuid', user.value.id);
      if (error) {
        console.error("Error updating data", error);
        return;
      };
    },
    //Clears the current profile. Called when the user logs out.
    async clearProfile() {
      this.profile = null;
    },
  },
  persist: true,
});
