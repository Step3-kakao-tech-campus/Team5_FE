import React from "react";
import "../common/skeleton.css";

export default function PortfolioReviewSkeleton() {
  return (
    <div className="flex flex-col gap-[10px] border-b-2 pb-5">
      <div className="skeleton bg-lightgray-sunsu w-full after:pb-[100%] after:block " />
      <div className="flex justify-between px-5 h-[20px]">
        <div className="skeleton bg-lightgray-sunsu w-[100px]" />
        <div className="skeleton bg-lightgray-sunsu w-[50px]" />
      </div>
      <div className="flex px-5">
        <div className="skeleton bg-lightgray-sunsu w-full h-[100px]" />
      </div>
    </div>
  );
}
