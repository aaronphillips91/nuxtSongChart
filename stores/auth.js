import { defineStore } from 'pinia'
import { useProfileStore } from './profile'

export const useAuthStore = defineStore({
  id: 'AuthStore',
  state: () => ({
    user: null,
  }),

  actions: {
    //Signs the user up with an account using Supabase Auth. Also creates a profile and sends the user to /profile/setup.
    async signUp(credentials) {
      const supabase = useSupabaseClient();
      const profileStore = useProfileStore();
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password
      })
      if (error) {
        console.error('Error: ', error.message);
      } else {
        this.user = data.user;
        await profileStore.createProfile(data.user);
        navigateTo('/profile/setup');
      }
    },
    //Signs the user in with their login credentials using Supabase Auth. Sends the user to /songs.
    async signIn(credentials) {
      console.log(credentials)
      const supabase = useSupabaseClient();
      const profileStore = useProfileStore();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      })
      if (error) {
        console.error('Error: ', error.message);
      } else {
        this.user = data.user;
        await profileStore.getProfile();
        if ( profileStore.profile.setup === true) {
          navigateTo('/songs');
        } else {
          navigateTo('/profile/setup');
        }
      }
    },
    //Signs the current user out using Supabase Auth. Sends the user to /login.
    async signOut() {
      const supabase = useSupabaseClient();
      const profileStore = useProfileStore();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error: ', error.message);
      } else {
        this.user = null;
        profileStore.clearProfile();
        navigateTo('/login');
      }
    }
  },
  persist: true,
});
