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
        .eq("uuid", user.value.id)
        .single();
      if (error) {
        console.error("Error fetching profile", error);
        return;
      }
      this.profile = data;
    },
    //Updates the profile table on the currently logged in user.  Accepts an object.
    async updateProfile(userData) {
      const supabase = useSupabaseClient();
      
      if (!this.profile) {
        console.warn("Profile not found. Cannot update.");
        return;
      }
      
      const { uuid } = this.profile;
      
      try {
        const { error } = await supabase
          .from('profile')
          .update(userData)
          .eq('uuid', uuid);
          
        if (error) {
          console.error("Error updating profile data:", error.message);
          return;
        }
        
        console.log("Profile updated successfully.");
        this.setupCompleteCheck();
      } catch (err) {
        console.error("Unexpected error updating profile:", err);
      }
    },
    async setupCompleteCheck() {
      this.getProfile();
      if (this.profile.setup_complete == true) {
        return;
      }
      if (this.profile.name == null) {
        return;
      } 
      if (this.profile.username == null) {
        return;
      }
      if (this.profile.email == null) {
        return;
      } 
      if (this.profile.pic == null) {
        return;
      }
      this.updateProfile({setup_complete: true})
    },
    //Deletes any previous profile pics, then uploads the new one and updates the profile table with the URL of the new photo.
    async updateProfilePic(file) {
      const supabase = useSupabaseClient();
      if (!this.profile) {
        throw new Error('No user logged in');
      }

      const folderPath = `${this.profile.uuid}`;
      const { data: listData, error: listError } = await supabase
      .storage
      .from('profile_pics')
      .list(this.profile.uuid);

      if (listError && listError.message !== 'The resource was not found') {
        throw listError;
      }

      if (listData && listData.length > 0) {
        for (const file of listData) {
          await supabase
          .storage
          .from('profile_pics')
          .remove([`${this.profile.uuid}/${file.name}`]);
        }
      }
      const fileName = `${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('profile_pics')
        .upload(`${folderPath}/${fileName}`, file);
      if (uploadError) {
        throw uploadError;
      }
      const { data: publicURL, error: urlError } = await supabase
        .storage
        .from('profile_pics')
        .getPublicUrl(`${folderPath}/${fileName}`);

      if (urlError) {
        throw urlError;
      }
      const { data: updateData, error: updateError } = await supabase
        .from('profile')
        .update({ pic: publicURL.publicUrl })
        .eq('uuid', this.profile.uuid);
    },
    //Clears the current profile. Called when the user logs out.
    async clearProfile() {
      this.profile = null;
    },
  },
  persist: true,
});
