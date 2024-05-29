const supabase = useSupabaseClient();

export async function uploadArt(file) {
  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from('album_art')
    .upload(fileName, file);
  if (error) {
    throw error;
  }
  const { data: publicUrlData, error: urlError } = supabase.storage
    .from('album_art')
    .getPublicUrl(fileName);
  if (urlError) {
    throw urlError;
  }
  const publicURL = publicUrlData.publicUrl;
  return publicURL;
}