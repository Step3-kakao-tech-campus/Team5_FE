import React from "react";
import { useSelector } from "react-redux";
import BottomSheet from "../common/bottomsheet/BottomSheet";

export default function MembershipBottomSheet({ onClose }) {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <BottomSheet onClose={onClose}>
      <div className="flex flex-col font-bold pb-[70px] text-lg">
        <span>
          {userInfo.username}님은 {userInfo.payedAt}부터
        </span>
        <span>순수 멤버십을 이용 중입니다.</span>
      </div>
    </BottomSheet>
  );
}
