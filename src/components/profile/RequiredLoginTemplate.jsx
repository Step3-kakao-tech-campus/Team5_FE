import React from "react";
import { useNavigate } from "react-router-dom";

export default function RequiredLoginTemplate() {
  const navigate = useNavigate();

  return (
    <div className="p-20 flex flex-col text-3xl gap-3">
      <span>로그인이 필요합니다.</span>
      <button
        className=" w-fit underline text-base"
        onClick={() => {
          navigate("/login");
        }}
      >
        로그인 하기
      </button>
    </div>
  );
}
