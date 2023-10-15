import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function ChatHeader({ counterName }) {
  const navigate = useNavigate();
  return (
    <div className=" border-solid border-0 border-b-2 h-8 border-zinc-200 flex items-center gap-2 fixed z-10 top-0 w-full max-w-[576px] bg-white">
      <IoChevronBack
        className="text-2xl cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      />
      <span className=" text-xs">{counterName}</span>
    </div>
  );
}
