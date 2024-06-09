import { defineStore } from "pinia";

export const useSongStore = defineStore({
  id: "SongStore",
  state: () => ({
    songs: [],
    song: null,
    newSongModal: false,
  }),

  actions: {
    openNewSongModal() {
      this.newSongModal = true;
      console.log("modal open");
    },
    closeNewSongModal() {
      this.newSongModal = false;
      console.log("modal closed");
    },
    //Creates a new song in the song table, then calls the getSongs() function to update the local songs array.
    async createSong(song) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("song")
        .insert({
          title: song.title,
          artist: song.artist,
          album: song.album,
          art: song.art,
          tempo: song.tempo,
          public: song.isPublic,
          original_key: song.original_key,
        })
        .select()
        .single();
      if (error) {
        console.error("Error: ", error.message);
      } else {
        console.log(data);
        this.getSongs();
        this.closeNewSongModal();
        navigateTo(`/songs/${data.uuid}`);
      }
    },
    //Fetches the songs from the song table using the current user's uuid.
    async getSongs() {
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();

      if (!user.value) {
        console.error("No user is logged in");
        return;
      }

      const { data, error } = await supabase
        .from("song")
        .select("*")
        .eq("creator_id", user.value.id);

      if (error) {
        console.error("Error fetching songs: ", error.message);
      } else {
        if (data) {
          console.log(data);
          if (Array.isArray(data)) {
            this.songs = data;
          } else {
            console.error("Fetched data is not an array:", data);
            this.songs = [];
          }
        } else {
          console.error("Fetched data is null or undefined:", data);
          this.songs = [];
        }
      }
    },
    async getSong(songId) {
      const supabase = useSupabaseClient();

      const { data, error } = await supabase
        .from("song")
        .select("*")
        .eq("uuid", songId)
        .single();

      if (error) {
        console.error(error);
      } else {
        this.song = data;
      }
    },
    //Updates the song based on the accepted song object, then calls the getSongs() function to update the local songs array.
    async updateSong(song) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("song")
        .update(song)
        .eq("uuid", song.uuid);
      if (error) {
        console.error("Error: ", error.message);
      } else {
        this.getSongs();
      }
    },
    //Deletes the song based on the accepted song object,  then calls the getSongs() function to update the local songs array.
    async deleteSong(song) {
      const supabase = useSupabaseClient();
      const { error } = await supabase
        .from("song")
        .delete("*")
        .eq("uuid", song.uuid);
      if (error) {
        console.error("Error: ", error.message);
      } else {
        this.getSongs();
      }
    },
  },
});
