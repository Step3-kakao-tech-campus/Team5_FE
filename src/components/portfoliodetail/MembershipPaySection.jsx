import React from "react";
import Button from "../common/atoms/Button";

export default function MembershipPaySection({ handleOpenPaymentBottomSheet }) {
  return (
    <div className="flex h-[46px] justify-between">
      <div className="text-sm mr-[10px] flex flex-col">
        <span>이전 매칭 내역을 확인하려면</span>
        <span>순수 멤버십을 결제하셔야 합니다.</span>
      </div>
      <div className="inline w-[120px]">
        <Button
          onClick={handleOpenPaymentBottomSheet}
          className="block w-full h-full rounded-[10px] font-normal text-sm text-black border-solid border-skyblue-sunsu border-2 hover:bg-blue-sunsu hover:text-white"
        >
          결제하기
        </Button>
      </div>
    </div>
  );
}
