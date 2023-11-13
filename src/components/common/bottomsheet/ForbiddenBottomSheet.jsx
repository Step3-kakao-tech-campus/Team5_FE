import React from "react";
import Button from "../atoms/Button";
import BottomSheet from "./BottomSheet";

export default function ForbiddenBottomSheet({ onClose }) {
  return (
    <BottomSheet onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex flex-col tracking-tight font-bold pb-[42px]">
          <span>사용할 수 없는 기능입니다.</span>
        </div>
        <Button
          onClick={onClose}
          className="block w-full h-[50px] rounded-[10px] font-normal text-sm bg-lightskyblue-sunsu"
        >
          확인
        </Button>
      </div>
    </BottomSheet>
  );
}
