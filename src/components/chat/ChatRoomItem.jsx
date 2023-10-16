import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChatRoomItem({
  timestamp,
  counterName,
  lastMessage,
  chatId,
  unreadCount,
}) {
  const navigate = useNavigate();

  return (
    <button
      className="px-[29px] pt-[15px] pb-[20px] flex flex-col w-full"
      onClick={() => {
        navigate(`/chat/${chatId}`);
      }}
    >
      <div className="flex justify-between items-end w-full">
        <span className="font-bold text-lg">{counterName}</span>
        <span className="text-sm text-zinc-500">
          {dayjs(timestamp).format("YYYY.MM.DD")}
        </span>
      </div>
      <div className="h-8 flex justify-between w-full items-end">
        <span className="text-ellipsis whitespace-nowrap overflow-hidden w-4/5 text-base text-left">
          {lastMessage}
        </span>
        {unreadCount > 0 && (
          <span className="text-xs bg-red-500 text-white rounded-full self-start px-2">
            {unreadCount}
          </span>
        )}
      </div>
    </button>
  );
}
