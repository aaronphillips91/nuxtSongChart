import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'AuthStore',
  state: () => ({
    user: null,
  }),

  actions: {
    async signUp(email, password) {
      const client = useSupabaseClient()
      const { data, error } = await client.auth.signUp({
        email: email,
        password: password
      })
      if (error) {
        console.error('Error: ', error.message)
      } else {
        this.user = data.user
        navigateTo('/profile')
      }
    },
    async signIn(email, password) {
      const client = useSupabaseClient()
      const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password
      })
      if (error) {
        console.error('Error: ', error.message)
      } else {
        this.user = data.user
        navigateTo('/profile')
      }
    },
    async signOut() {
      const client = useSupabaseClient()
      const { error } = await client.auth.signOut()
      if (error) {
        console.error('Error: ', error.message)
      } else {
        this.user = null
        navigateTo('/login')
      }
    }
  },
  persist: true,
});
