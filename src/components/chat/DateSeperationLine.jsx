import React from "react";
import { BiCalendar } from "react-icons/bi";

export default function DateSeperationLine({ date }) {
  return (
    <div className="flex gap-3 items-center justify-center">
      <div className=" h-1/2 w-full border-dotted border-0 border-t border-black self-end" />
      <div className="flex items-center gap-1 text-white p-0.5 px-2 rounded-md bg-zinc-500">
        <BiCalendar size={18} />
        <span className=" text-xs whitespace-nowrap">{date}</span>
      </div>
      <div className=" h-1/2 w-full border-0 border-t border-black border-dotted self-end" />
    </div>
  );
}
