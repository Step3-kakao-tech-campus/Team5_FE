import React from "react";
import { useSelector } from "react-redux";
import BottomSheet from "../common/BottomSheet";

export default function MembershipBottomSheet({ handler }) {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <BottomSheet handler={handler}>
      <div className="flex flex-col font-bold pb-10 text-lg">
        <span>
          {userInfo.username}님은 {userInfo.payedAt}부터
        </span>
        <span>순수 멤버십을 이용 중입니다.</span>
      </div>
    </BottomSheet>
  );
}
