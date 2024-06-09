import { defineStore } from "pinia";

export const useSectionStore = defineStore({
  id: "SectionStore",
  state: () => ({
    sections: [],
  }),
  actions: {
    async createSection(section) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("section")
        .insert({
          name: section.name,
          content: section.content,
          song: section.song,
        })
        .select()
        .single();
      if (error) {
        console.error("Error: ", error.message);
      } else {
        this.getSections();
      }
    },
    async getSections(song) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("section")
        .select("*")
        .eq("song", song);
      if (error) {
        console.error("Error: ", error.message);
      } else {
        if (data) {
          console.log(data);
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
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("section")
        .update({
          name: section.name,
          content: section.content,
          song: section.song,
        })
        .eq("uuid", section.id);
      if (error) {
        console.error("Error: ", error.message);
      } else {
        this.getSections();
      }
    },
    async deleteSection() {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("section")
        .delete()
        .eq("uuid", section.id);
      if (error) {
        console.error("Error: ", error.message);
      } else {
        this.getSections();
      }
    },
  },
});
