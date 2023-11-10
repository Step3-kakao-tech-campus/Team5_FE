import {
  get,
  getDatabase,
  limitToLast,
  onChildAdded,
  onValue,
  orderByChild,
  query,
  ref,
  serverTimestamp,
  startAt,
  update,
} from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";
import ChatMessage from "../components/chat/ChatMessage";
import DateSeperationLine from "../components/chat/DateSeperationLine";
import Spinner from "../components/common/atoms/Spinner";
import "../firebase";
import { convertToDate } from "../utils/convert";
import useChatRoom from "../hooks/useChatRoom";

export default function ChatRoomPage() {
  const [messages, setMessages] = useState([]);
  const [counterAvatar, setCounterAvatar] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // [추가] 로딩 상태
  const { userInfo } = useSelector((state) => state.user);
  const { chatId } = useParams();
  const [counterName, setCounterName] = useState("");
  const messageEndRef = useRef(null);
  let prevDate = null;
  const { checkChatId } = useChatRoom();

  useEffect(() => {
    // 0. chatId 검증
    checkChatId(chatId);

    // 0. 채팅방 유저가 맞는지 검증
    const checkChatRoomUser = async () => {
      const chatRoomRef = ref(
        getDatabase(),
        `users/${userInfo.userId}/chatRooms/${chatId}`,
      );
      const chatRoom = await get(chatRoomRef);
      if (!chatRoom.exists()) {
        navigate("/404", { replace: true });
        return false;
      }
      return true;
    };

    // 1. 저장되어 있는 메세지 가져오기
    // 1-0) 상대방 아바타 가져오기
    // 1-1) 채팅방 이름 가져오기
    const getCounterName = async () => {
      const snapShot = await get(
        ref(getDatabase(), `users/${userInfo.userId}/chatRooms/${chatId}`),
      );
      setCounterName(snapShot.val().counterName);
      const counterAvatarRef = ref(
        getDatabase(),
        `users/${snapShot.val().counterId}/avatar`,
      );
      const counterAvatarSnapShot = await get(counterAvatarRef);
      setCounterAvatar(counterAvatarSnapShot.val());
    };

    // 1-2) 이전의 메세지 읽음 처리
    const updateReadMessage = async () => {
      const snapShot = await get(
        ref(getDatabase(), `users/${userInfo.userId}/chatRooms/${chatId}`),
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

    // 1-3) 메세지 가져오기
    const getMessages = async () => {
      const snapShot = await get(ref(getDatabase(), `messages/${chatId}`));
      setMessages(snapShot.val() ? Object.values(snapShot.val()) : []);
    };

    // 1-4) 마지막 방문 시점 최신화(굳이 비동기를 기다릴 필요X)
    const updateLastVisited = () => {
      update(
        ref(getDatabase(), `users/${userInfo.userId}/chatRooms/${chatId}`),
        {
          lastVisited: serverTimestamp(),
        },
      );
    };

    (async () => {
      if (await checkChatRoomUser()) {
        await getCounterName();
        await updateReadMessage();
        await getMessages();
        updateLastVisited();
        setIsLoading(false); // 메세지 가져오기 완료
      }
    })();

    // 2. 메세지가 추가될 때마다 메세지 추가하기
    const sorted = query(
      ref(getDatabase(), `messages/${chatId}`),
      orderByChild("timestamp"),
    );
    // 새로운 데이터가 추가될 때마다 변화를 감지하는 이벤트 리스너를 등록
    // 1. 메세지 읽음 처리
    // 2. 메세지 추가
    // 3. 마지막 방문 시점 최신화
    const unsubscribe = onChildAdded(
      query(sorted, startAt(Date.now())), // 현재 시간보다 큰 데이터만 가져오기
      (snapshot) => {
        if (snapshot.val().user.userId !== userInfo?.userId) {
          update(ref(getDatabase(), `messages/${chatId}/${snapshot.key}`), {
            isRead: true,
          }).then(() => {
            get(ref(getDatabase(), `messages/${chatId}/${snapshot.key}`)).then(
              (newSnapshot) => {
                setMessages((oldMessages) => [
                  ...oldMessages,
                  newSnapshot.val(),
                ]);
                updateLastVisited();
              },
            );
          });
        } else {
          // 나의 메세지는 isRead:Fasle로 추가(상대방의 존재 유무를 모름) -> 존재할 경우 isRead감시
          setMessages((oldMessages) => [...oldMessages, snapshot.val()]);
          updateLastVisited();
        }
      },
    );

    // 마지막 메세지의 변경을 감시
    const lastMessageRef = query(
      ref(getDatabase(), `messages/${chatId}/`),
      limitToLast(1),
    );
    const unreadUnsubscribe = onValue(lastMessageRef, (newSnapShot) => {
      if (!newSnapShot.exists()) return;
      const messageId = Object.keys(newSnapShot.val())[0]; // messageId 추출
      const messageData = newSnapShot.val()[messageId]; // 해당 messageId의 데이터
      if (!messageData.isRead) return;
      // 만약 마지막 메세지의 isRead가 변경되었다면 상대방이 모든 메세지를 읽었다는 것
      setMessages((oldMessages) =>
        oldMessages.map((message) => ({ ...message, isRead: true })),
      );
    });

    // eslint-disable-next-line consistent-return
    return () => {
      setMessages([]);
      unsubscribe?.();
      unreadUnsubscribe?.();
    };
  }, []);

  // 3. 메세지가 추가될 때마다 스크롤 내리기
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col w-full h-full">
      {/* 헤더 */}
      <ChatHeader counterName={counterName} chatId={chatId} />
      {/* 메세지 영역 */}
      <div className="px-[12px] pt-3 flex flex-col gap-[8px] relative mb-[80px]">
        {messages?.map((message) => {
          if (prevDate !== convertToDate(message.timestamp)) {
            prevDate = convertToDate(message.timestamp);
            return (
              <React.Fragment key={message.timestamp}>
                <DateSeperationLine date={prevDate} />
                <ChatMessage
                  message={message}
                  isSender={message.user.userId === userInfo.userId}
                  counterAvatar={counterAvatar}
                />
              </React.Fragment>
            );
          }
          return (
            <ChatMessage
              key={message.timestamp}
              message={message}
              isSender={message.user.userId === userInfo.userId}
              counterAvatar={counterAvatar}
            />
          );
        })}
        <div ref={messageEndRef} />
      </div>
      {/* 메세지 입력창 */}
      <div className=" w-full z-10 bg-white fixed bottom-10 max-w-[576px]">
        <ChatInput />
      </div>
    </div>
  );
}
