import React from "react";
import { Link } from "react-router-dom";
import BottomSheet from "./BottomSheet";

export default function ServerErrorBottomSheet({ onClose }) {
  return (
    <BottomSheet onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex flex-col tracking-tight font-bold pb-[42px]">
          <span>서버에 문제가 있습니다.</span>
          <span>페이지를 새로고침 후 다시 시도해주세요.</span>
        </div>
        <Link
          to="/"
          className="w-full h-[50px] rounded-[10px] text-sm bg-lightskyblue-sunsu flex items-center justify-center"
        >
          홈으로
        </Link>
      </div>
    </BottomSheet>
  );
}
