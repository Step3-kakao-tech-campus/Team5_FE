import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function NoQuotationCollect() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className="flex justify-center w-full h-full">
      <div className="pt-10 flex flex-col items-center gap-5">
        <BsExclamationTriangle size={50} />
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">
            아직 진행 중인 견적서가 없어요.
          </span>
          {userInfo === "planner" ? (
            <span>지금 매칭을 시작해보세요!</span>
          ) : (
            <span>지금 웨딩 플래너에게 견적을 요청해보세요.</span>
          )}
        </div>
      </div>
    </div>
  );
}
