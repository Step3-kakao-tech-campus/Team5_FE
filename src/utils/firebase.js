import { get, getDatabase, ref, remove } from "firebase/database";
import "../firebase";

export const getAvatarUrl = async (userId) => {
  const snapShot = await get(ref(getDatabase(), `users/${userId}/avatar`));
  return snapShot.val();
};

export const deleteUserData = async (userId) => {
  const database = getDatabase();
  const pathToDelete = `users/${userId}/chatRooms`;
  await remove(ref(database, pathToDelete));
};
