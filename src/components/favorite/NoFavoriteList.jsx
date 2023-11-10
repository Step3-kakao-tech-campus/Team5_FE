import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";

export default function NoFavoriteList() {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="pt-10 flex flex-col items-center gap-5">
        <BsExclamationTriangle size={50} />
        <div className="flex flex-col items-center">
          <span className=" text-2xl font-bold">
            찜한 웨딩 플래너가 아직 없네요.
          </span>
          <span>매칭을 시작해보세요.</span>
        </div>
      </div>
    </div>
  );
}
