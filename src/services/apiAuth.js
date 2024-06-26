import supabase from './supabase';

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const signup = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  // Update fullname or password
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // Upload avatar image
  const filename = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(filename, avatar);

  if (storageError) throw new Error(storageError.message);

  // Update avatar in the user
  const { data: updatedUserData, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/avatars/${filename}`,
      },
    });

  if (updateError) throw new Error(updateError.message);
  return updatedUserData;
};
