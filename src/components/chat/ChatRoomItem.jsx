/* eslint-disable no-unused-vars */
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import Photo from "../common/atoms/Photo";

export default function ChatRoomItem({
  timestamp,
  counterName,
  lastMessage,
  chatId,
  unreadCount,
  avatar,
}) {
  const navigate = useNavigate();

  return (
    <button
      className="px-[29px] pt-[15px] pb-[20px] w-full "
      onClick={() => {
        navigate(`/chat/${chatId}`);
      }}
    >
      <div className="flex items-center w-full gap-2">
        <Photo
          src={avatar}
          alt="avatar"
          className="w-12 h-12 object-cover object-center rounded-2xl shrink-0"
        />
        <div className="flex flex-col grow">
          <div className="flex justify-between w-full">
            <span className="text-lg font-bold">{counterName}</span>
            <span className="text-sm text-zinc-500">
              {dayjs(timestamp).format("YYYY.MM.DD")}
            </span>
          </div>
          <div className="flex justify-between w-full ">
            <span className="w-[90%] text-left line-clamp-1">
              {lastMessage}
            </span>
            {unreadCount > 0 && (
              <span className="self-start px-2 text-xs text-white bg-red-500 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
