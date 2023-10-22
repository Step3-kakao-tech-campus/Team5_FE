import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackButton } from "../../assets/left-01.svg";

export default function BackButtonHeader({ children }) {
  const navigate = useNavigate();
  return (
    <div className="h-[50px] border-b border-lightgray-sunsu flex items-center gap-2 sticky z-10 top-0 bg-white">
      <BackButton
        className="cursor-pointer absolute left-[17px]"
        onClick={() => {
          navigate(-1);
        }}
      />
      {children}
    </div>
  );
}
