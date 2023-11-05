import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";

export default function NoWritableReview() {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="pt-10 flex flex-col items-center gap-5">
        <BsExclamationTriangle size={50} />
        <div className="flex flex-col items-center">
          <span className=" text-2xl font-bold">
            작성 가능한 리뷰가 없습니다.
          </span>
          <span>진행 중인 견적서를 최종 확정해 주세요.</span>
        </div>
      </div>
    </div>
  );
}
