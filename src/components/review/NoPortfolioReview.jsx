import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";

export default function NoPortfolioReview() {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="pt-10 flex flex-col items-center gap-5">
        <BsExclamationTriangle size={50} />
        <div className="flex flex-col items-center">
          <span className=" text-2xl font-bold">
            아직 등록된 리뷰가 없어요.
          </span>
        </div>
      </div>
    </div>
  );
}
