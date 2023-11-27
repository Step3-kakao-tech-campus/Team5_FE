import React from "react";
import BottomSheet from "../common/bottomsheet/BottomSheet";
import Button from "../common/atoms/Button";

export default function AlreadyConfirmBottomSheet({ onClose }) {
  return (
    <BottomSheet onClose={onClose}>
      <div className="flex flex-col gap-10">
        <p className=" font-semibold">이미 확정 처리된 매칭입니다.</p>
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
