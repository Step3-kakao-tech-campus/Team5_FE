import React from "react";
import dayjs from "dayjs";

function ChatMessage({ message, isSender }) {
  const hasImageProperty = "image" in message;

  if (hasImageProperty) {
    return (
      <div className={`flex gap-1  ${isSender ? "flex-row-reverse" : ""}`}>
        <img
          src={message.image}
          alt="이미지"
          className="max-w-[80%] max-h-[400px]"
        />
        <div className=" self-end text-xs flex flex-col">
          <span>{message.isRead ? "" : 1}</span>
          <span>{dayjs(message.timestamp).format("HH:mm")}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-1  ${isSender ? "flex-row-reverse" : ""}`}>
      <div
        className={`max-w-[70%] px-[14px] py-[10px] border border-lightgray-sunsu text-sm rounded-[20px] ${
          isSender ? "bg-blue-sunsu text-white rounded-tr-sm" : "rounded-tl-sm"
        }`}
      >
        {message.content}
      </div>
      <div
        className={`self-end text-xs flex flex-col ${
          isSender ? "items-end" : ""
        }`}
      >
        <span className="text-zinc-500">{message.isRead ? "" : 1}</span>
        <span>{dayjs(message.timestamp).format("HH:mm")}</span>
      </div>
    </div>
  );
}

export default ChatMessage;
