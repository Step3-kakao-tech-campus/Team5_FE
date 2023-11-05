import {
  get,
  getDatabase,
  limitToLast,
  orderByChild,
  query,
  ref,
  startAfter,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatListHeaderRow from "../components/chat/ChatListHeaderRow";
import ChatRoomItem from "../components/chat/ChatRoomItem";
import Spinner from "../components/common/atoms/Spinner";
import "../firebase";

export default function ChatListPage() {
  const { userInfo } = useSelector((state) => state.user);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getChatRooms = async () => {
    const databaseRef = ref(
      getDatabase(),
      `users/${userInfo.userId}/chatRooms`,
    );
    const snapShot = await get(databaseRef);
    if (snapShot.val() === null) return [];
    return Object.values(snapShot.val());
  };

  useEffect(() => {
    // map 함수 내부에서 async 함수를 사용할 때, 각각의 비동기 작업이 모두 완료될 때까지 기다리는 방법이 필요합니다.
    // 이를 위해 Promise.all 또는 for...of 루프와 await를 사용하여 처리할 수 있습니다.
    const getMessage = async () => {
      const chatRooms = await getChatRooms();

      const promises = chatRooms.map(async (chat) => {
        const databaseRef = ref(getDatabase(), `messages/${chat.chatId}`);
        const q = query(databaseRef, limitToLast(1));
        const snapShot = await get(q);
        if (snapShot.val() === null) return null;

        // unread 메세지 개수 세기
        const unreadQuery = query(
          databaseRef,
          orderByChild("timestamp"),
          startAfter(chat.lastVisited),
        );
        const unreadSnapShot = await get(unreadQuery);
        const unreadCount = unreadSnapShot.val()
          ? Object.values(unreadSnapShot.val()).length
          : 0;
        const message = Object.values(snapShot.val())[0];
        const avatar = await get(
          ref(getDatabase(), `users/${chat.counterId}/avatar`),
        );
        return {
          chatId: chat.chatId,
          counterName: chat.counterName,
          lastMessage: message.content,
          timestamp: message.timestamp,
          unreadCount,
          avatar: avatar.val(),
        };
      });

      const results = await Promise.all(promises);
      const filteredResults = results.filter((message) => message !== null);
      const sortedResults = filteredResults.sort(
        (a, b) => b.timestamp - a.timestamp,
      );
      setChatList(sortedResults);
      setLoading(false);
    };

    getMessage();
    return () => {
      setChatList([]);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full h-full">
      <ChatListHeaderRow />
      {/* 채팅 목록 영역 */}
      {chatList.length > 0 &&
        chatList?.map((message) => (
          <div key={message.timestamp}>
            <ChatRoomItem
              timestamp={message.timestamp}
              counterName={message.counterName}
              lastMessage={message.lastMessage}
              chatId={message.chatId}
              unreadCount={message.unreadCount}
              avatar={message.avatar}
            />
          </div>
        ))}
    </div>
  );
}
