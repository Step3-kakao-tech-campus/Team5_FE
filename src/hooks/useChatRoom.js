import {
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
  serverTimestamp,
  startAt,
  update,
} from "firebase/database";
import { useState } from "react";
import "../firebase";
import { useNavigate } from "react-router-dom";
import { isNonNegativeInteger } from "../utils/convert";

export default function useChatRoom({ chatId, userId }) {
  const navigate = useNavigate();
  const [counterAvatar, setCounterAvatar] = useState(null);
  const [counterName, setCounterName] = useState("");

  // 1. 채팅방 아이디 검증
  const checkChatId = () => {
    if (!isNonNegativeInteger(chatId)) {
      navigate("404", { replace: true });
    }
  };

  // 2. 채팅방 유저가 맞는지 검증
  const checkChatRoomUser = async () => {
    const chatRoomRef = ref(
      getDatabase(),
      `users/${userId}/chatRooms/${chatId}`,
    );
    const chatRoom = await get(chatRoomRef);
    if (!chatRoom.exists()) {
      navigate("/404", { replace: true });
      return false;
    }
    return true;
  };

  // 3. 상대방 정보 가져오기
  const getCounterName = async () => {
    const snapShot = await get(
      ref(getDatabase(), `users/${userId}/chatRooms/${chatId}`),
    );
    setCounterName(snapShot.val().counterName);
    const counterAvatarRef = ref(
      getDatabase(),
      `users/${snapShot.val().counterId}/avatar`,
    );
    const counterAvatarSnapShot = await get(counterAvatarRef);
    setCounterAvatar(counterAvatarSnapShot.val());
  };

  // 4. 이전의 메세지 읽음 처리
  const updateReadMessage = async () => {
    const snapShot = await get(
      ref(getDatabase(), `users/${userId}/chatRooms/${chatId}`),
    );
    // 이전 메세지가 있을 경우
    if (snapShot.exists()) {
      const { lastVisited } = snapShot.val();
      const q = query(
        ref(getDatabase(), `messages/${chatId}`),
        orderByChild("timestamp"),
        startAt(lastVisited),
      );
      // 마지막 방문 시점 이후의 메세지
      const snapShot2 = await get(q);
      if (snapShot2.exists()) {
        const updates = {};
        Object.keys(snapShot2.val()).forEach((key) => {
          updates[`/messages/${chatId}/${key}/isRead`] = true;
        });
        await update(ref(getDatabase()), updates);
      }
    }
  };

  // 5) 마지막 방문 시점 최신화
  const updateLastVisited = () => {
    update(ref(getDatabase(), `users/${userId}/chatRooms/${chatId}`), {
      lastVisited: serverTimestamp(),
    });
  };

  return {
    checkChatId,
    checkChatRoomUser,
    getCounterName,
    updateReadMessage,
    updateLastVisited,
    counterAvatar,
    counterName,
  };
}
