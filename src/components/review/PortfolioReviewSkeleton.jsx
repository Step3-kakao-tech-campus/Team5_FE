import React from "react";
import "../common/skeleton.css";

export default function PortfolioReviewSkeleton() {
  return (
    <div className="flex flex-col gap-3 border-b-2 pb-5">
      <div className="skeleton bg-lightgray-sunsu w-full after:pb-[35%] after:block rounded-[10px]" />
      <div className="flex justify-between">
        <div className="skeleton bg-lightgray-sunsu w-[20%] after:pb-[15%] after:block rounded-[5px]" />
        <div className="skeleton bg-lightgray-sunsu w-[10%] after:pb-[15%] after:block rounded-[5px]" />
      </div>
      <div className="skeleton bg-lightgray-sunsu w-full after:pb-[15%] after:block rounded-[10px]" />
    </div>
  );
}
