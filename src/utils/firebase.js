import { get, getDatabase, ref } from "firebase/database";
import "../firebase";

export const getAvatarUrl = async (userId) => {
  const snapShot = await get(ref(getDatabase(), `users/${userId}/avatar`));
  return snapShot.val();
};
