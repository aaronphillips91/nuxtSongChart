import { defineStore } from "pinia";

export const useChartStore = defineStore({
  id: "ChartStore",
  state: () => ({
    songs: [],
    song: null,
    sections: [],
    arrangements: [],
    arrangement: null,
    arrangementSections: [],
    newSongModal: false,
  }),
  actions: {
    //Modal Actions
    openSongModal() {
      this.song = null;
      this.newSongModal = true;
      console.log("modal open");
    },
    closeSongModal() {
      this.newSongModal = false;
      console.log("modal closed");
    },

    //Song Actions
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
    async createSong(song) {
      const supabase = useSupabaseClient();

      if (!song) {
        console.error("Song not provided");
        return;
      } else {
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
          this.closeSongModal();
          navigateTo(`/songs/${data.uuid}`);
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
    async getSections(songId) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("section")
        .select("*")
        .eq("song", songId)
        .order("order", { ascending: true });

      if (error) {
        console.error(error);
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
    async createSection() {
      if (!this.song) {
        console.error("Song not provided");
        return;
      } else {
        const supabase = useSupabaseClient();
        console.log("Creating section for song", this.song.uuid);
        const { data, error } = await supabase.from("section").insert({
          name: "New Section",
          content: "",
          song: this.song.uuid,
          order: this.sections.length,
        });

        if (error) {
          console.error("Error: ", error.message);
        } else {
          this.getSections(this.song.uuid);
        }
      }
    },
    async updateSection(section) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("section")
        .update(section)
        .eq("uuid", section.uuid);
      if (error) {
        console.error("Error: ", error.message);
      } else {
        this.getSections(this.song.uuid);
      }
    },
    async deleteSection(section) {
      const supabase = useSupabaseClient();
      const { error } = await supabase
        .from("section")
        .delete("*")
        .eq("uuid", section.uuid);
      if (error) {
        console.error("Error: ", error.message);
      } else {
        this.getSections(this.song.uuid);
      }
    },
    async updateSectionOrder(newOrder) {
      for (let i = 0; i < newOrder.length; i++) {
        const section = newOrder[i];
        section.order = i;
        await this.updateSection(section);
      }
      // After updating all sections, fetch the updated list
      await this.getSections(this.song.uuid);
    },

    //Arrangement Actions
    async getArrangements(songId) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("arrangement")
        .select("*")
        .eq("song", songId)
        .order("order", { ascending: true });
      if (error) {
        console.error(error);
      } else {
        if (data) {
          if (Array.isArray(data)) {
            this.arrangements = data;
          } else {
            console.error("Fetched data is not an array:", data);
            this.arrangements = [];
          }
        } else {
          console.error("Fetched data is null or undefined:", data);
          this.arrangements = [];
        }
      }
    },
    async createArrangment() {
      if (!this.song) {
        console.error("Song not provided");
        return;
      } else {
        const supabase = useSupabaseClient();
        console.log("Creating arrangement for song", this.song.uuid);
        const { data, error } = await supabase.from("arrangement").insert({
          name: "New Arrangement",
          song: this.song.uuid,
        });
        this.getArrangements(this.song.uuid);
      }
    },
    async getArrangement(arrangementId) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("arrangement")
        .select("*")
        .eq("uuid", arrangementId)
        .single();
      if (error) {
        console.error(error);
      } else {
        this.arrangement = data;
        this.getArrangementSections(this.arrangement.uuid);
      }
    },
    async updateArrangement(arrangement) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("arrangement")
        .update(arrangement)
        .eq("uuid", arrangement.uuid);
      if (error) {
        console.error("Error: ", error.message);
      } else {
        this.getArrangement(arrangement.uuid);
      }
    },
    async deleteArrangement(arrangement) {
      const supabase = useSupabaseClient();
      const { error } = await supabase
        .from("arrangement")
        .delete("*")
        .eq("uuid", arrangement.uuid);
      if (error) {
        console.error("Error: ", error.message);
      } else {
        this.getArrangements(this.song.uuid);
      }
    },
    async updateArrangementOrder(newOrder) {
      for (let i = 0; i < newOrder.length; i++) {
        const arrangement = newOrder[i];
        arrangement.order = i;
        await this.updateArrangement(arrangement);
      }
      // After updating all sections, fetch the updated list
      await this.getSections(this.song.uuid);
    },

    //Arrangement Section Actions
    async createArrangementSection(arrangementSection) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("arrangement_section")
        .insert(arrangementSection);
      if (error) {
        console.error("Error: ", error.message);
      } else {
        this.getArrangementSections(this.arrangement.uuid);
      }
    },
    async getArrangementSections(arrangementId) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("arrangement_section")
        .select("*")
        .eq("arrangement", arrangementId)
        .order("order", { ascending: true });
      if (error) {
        console.error(error);
      } else {
        if (data) {
          if (Array.isArray(data)) {
            return data;
          } else {
            console.error("Fetched data is not an array:", data);
            return [];
          }
        } else {
          console.error("Fetched data is null or undefined:", data);
          return [];
        }
      }
    },
    async updateArrangementSection(arrangementSection) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("arrangement_section")
        .update(arrangementSection)
        .eq("uuid", arrangementSection.uuid);
      if (error) {
        console.error("Error: ", error.message);
      } else {
        this.getArrangementSections(this.arrangement.uuid);
      }
    },
    async deleteArrangementSection(arrangementSection) {
      const supabase = useSupabaseClient();
      const { error } = await supabase
        .from("arrangement_section")
        .delete("*")
        .eq("uuid", arrangementSection.uuid);
      if (error) {
        console.error("Error: ", error.message);
      } else {
        this.getArrangementSections(this.arrangement.uuid);
      }
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
