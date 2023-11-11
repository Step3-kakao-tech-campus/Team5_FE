import {
  get,
  getDatabase,
  limitToLast,
  onChildAdded,
  onValue,
  orderByChild,
  query,
  ref,
  startAt,
  update,
} from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";
import ChatMessage from "../components/chat/ChatMessage";
import DateSeperationLine from "../components/chat/DateSeperationLine";
import Spinner from "../components/common/atoms/Spinner";
import "../firebase";
import useChatRoom from "../hooks/useChatRoom";
import { convertToDate } from "../utils/convert";

export default function ChatRoomPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // [추가] 로딩 상태
  const { userInfo } = useSelector((state) => state.user);
  const { chatId } = useParams();
  const messageEndRef = useRef(null);
  let prevDate = null;
  const {
    checkChatId,
    checkChatRoomUser,
    getCounterName,
    updateReadMessage,
    updateLastVisited,
    counterAvatar,
    counterName,
  } = useChatRoom({ chatId, userId: userInfo.userId });

  const viewport = window.visualViewport;
  function adjustLayout() {
    const viewportHeight = viewport.height;
    window.innerHeight = viewportHeight;
    console.log("viewportHeight", viewportHeight);
    console.log("window.innerHeight", window.innerHeight);
  }

  viewport.addEventListener("resize", adjustLayout);

  // 초기 레이아웃 조정
  adjustLayout();

  useEffect(() => {
    checkChatId(); // 채팅방이 ID 검증
    // 이전 메세지 가져오기
    const getMessages = async () => {
      const snapShot = await get(ref(getDatabase(), `messages/${chatId}`));
      setMessages(snapShot.val() ? Object.values(snapShot.val()) : []);
    };

    const startChat = async () => {
      if (await checkChatRoomUser()) {
        await getCounterName(); // 상대방 정보 가져오기
        await updateReadMessage(); // 읽음 처리
        await getMessages(); // 읽음 처리 이후 메세지 가져오기
        updateLastVisited(); // 마지막 방문 시점 최신화
        setIsLoading(false); // 메세지 가져오기 완료
      }
    };
    // 1. 채팅방 시작
    startChat();

    // 2. 메세지가 추가될 때마다 메세지 추가하기
    const sorted = query(
      ref(getDatabase(), `messages/${chatId}`),
      orderByChild("timestamp"),
    );
    // 새로운 데이터가 추가될 때마다 변화를 감지하는 이벤트 리스너를 등록
    // 1). 메세지 읽음 처리
    // 2). 메세지 추가
    // 3). 마지막 방문 시점 최신화
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
    messageEndRef.current?.scrollIntoView({ behavior: "auto" });
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
