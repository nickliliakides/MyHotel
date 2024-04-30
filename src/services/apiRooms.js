import supabase from './supabase';

export const getRooms = async () => {
  let { data, error } = await supabase.from('Rooms').select('*');

  if (error) {
    console.error(error);
    throw new Error('Error on loading rooms');
  }

  return data;
};

export const createEditRoom = async (roomData, id) => {
  const hasImagePath = roomData.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  );
  const imageName = `${Math.random()}-${roomData.image.name}`.replaceAll(
    '/',
    '-'
  );
  const imagePath = hasImagePath
    ? roomData.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/room-images/${imageName}`;

  let query = supabase.from('Rooms');

  // Create Room
  if (!id) {
    query = query.insert([{ ...roomData, image: imagePath }]);
  }

  // Edit Room
  if (id) {
    query = query.update({ ...roomData, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error('Error on creating room');
  }

  // Upload image File
  if (!hasImagePath) {
    const { error: uploadError } = await supabase.storage
      .from('room-images')
      .upload(imageName, roomData.image);

    if (uploadError) {
      await supabase.from('Rooms').delete().eq('id', data.id);
      throw new Error('Error on uploading file');
    }
  }

  return data;
};

export const deleteRoom = async (id) => {
  const { data, error } = await supabase.from('Rooms').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Error on deleting room');
  }

  return data;
};
