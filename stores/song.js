import { defineStore } from "pinia";

export const useSongStore = defineStore({
  id: "SongStore",
  state: () => ({
    songs: [],
    song: null,
    sections: [],
    arrangements: [],
    setlists: [],
    setlist: null,
    newSongModal: false,
  }),

  actions: {
    //Modal Actions
    openNewSongModal() {
      this.song = null;
      this.newSongModal = true;
      console.log("modal open");
    },
    closeNewSongModal() {
      this.newSongModal = false;
      console.log("modal closed");
    },
    //Song Actions
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
    //Section Actions
    async createSection(newSection) {
      if (this.song) {
        this.song.sections = this.song.sections || [];
        this.song.sections.push(newSection);
        await this.updateSong(this.song);
      }
    },
    async getSections(songId) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("section")
        .select("*")
        .eq("song", songId)
        .order("order", { ascending: true });
      if (error) {
        console.error("Error fetching sections: ", error.message);
      } else {
        if (data) {
          if (Array.isArray(data)) {
            this.sections = data;
          } else {
            console.error("Fetched data is not an array:", data);
            this.sections = [];
          }
        } else {
          console.error("Fetched data is null or undefined:", data);
          this.sections = [];
        }
      }
    },
    async updateSection(section) {
      if (this.song) {
        const sectionIndex = this.song.sections.findIndex(
          (s) => s.id === section.id
        );
        if (sectionIndex !== -1) {
          this.song.sections[sectionIndex] = section;
          await this.updateSong(this.song);
        }
      }
    },
    async deleteSection(sectionId) {
      this.song.sections = this.song.sections.filter(
        (section) => section.id !== sectionId
      );
      await this.updateSong(this.song);
    },
    //Arrangement Actions
    async createArrangement(newArrangement) {
      if (this.song) {
        this.song.arrangements = this.song.arrangements || [];
        this.song.arrangements.push(newArrangement);
        await this.updateSong(this.song);
      }
    },
    async updateArrangements(arrangementId) {
      console.log("Updating arrangement: ", arrangementId);
    },
    async deleteArrangements(arrangementId) {
      console.log("Deleting arrangement: ", arrangementId);
    },
    //Art Actions
    async uploadArt(file) {
      const supabase = useSupabaseClient();
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("album_art")
        .upload(fileName, file);
      if (error) {
        throw error;
      }
      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("album_art")
        .getPublicUrl(fileName);
      if (urlError) {
        throw urlError;
      }
      const publicURL = publicUrlData.publicUrl;
      return publicURL;
    },
  },
});
