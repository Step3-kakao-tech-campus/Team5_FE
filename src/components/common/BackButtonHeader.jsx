import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function BackButtonHeader({ children }) {
  const navigate = useNavigate();
  return (
    <div className=" border-b h-9 border-zinc-200 flex items-center gap-2 sticky z-10 top-0 bg-white">
      <IoChevronBack
        className="text-2xl cursor-pointer absolute left-2"
        onClick={() => {
          navigate(-1);
        }}
      />
      {children}
    </div>
  );
}