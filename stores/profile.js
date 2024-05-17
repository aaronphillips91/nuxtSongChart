import { defineStore } from "pinia";

export const useProfileStore = defineStore({

  id: "ProfileStore",
  state: () => ({
    profile: null,
  }),

  actions: {
    async createProfile(user) {
      const client = useSupabaseClient();
      const { error } = await client
      .from("profiles")
      .insert({
        uuid: user.id,
        username: user.email,
        contact_email: user.email,
        sub_tier: 'SongChart Free',
        setup_complete: false,
        pic: 'https://uvsyswbkrxqqofowmkqm.supabase.co/storage/v1/object/public/profile_pics/5ec58552-f138-44d6-851b-018c726ba1ca.png'
      })
    },
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

      this.profile = data[0];
    },
    async updateProfile(userData) {
      const client = useSupabaseClient();
      const user = useSupabaseUser();
      if (!user.value) {
        return;
      }

      const { error } = await client 
      .from('profiles')
      .update(userData)
      .eq('uuid', user.value.id)

      if (error) {
        console.error("Error updating data", error);
        return;
      }
    },
    async clearProfile() {
      this.profile = null;
    },
  },
  persist: true,
});
