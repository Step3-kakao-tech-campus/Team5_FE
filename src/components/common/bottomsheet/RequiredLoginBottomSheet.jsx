import React from "react";
import { Link } from "react-router-dom";
import BottomSheet from "./BottomSheet";

export default function RequiredLoginBottomSheet({ onClose }) {
  return (
    <BottomSheet onClose={onClose}>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col font-semibold">
          <span>더 많은 서비스를 이용하려면</span>
          <span>로그인이 필요합니다.</span>
        </div>
        <Link
          to="/login"
          onClick={onClose}
          className=" w-full h-[50px] rounded-[10px] text-sm
          bg-lightskyblue-sunsu flex justify-center items-center"
        >
          이메일로 로그인
        </Link>
      </div>
    </BottomSheet>
  );
}
