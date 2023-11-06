import React from "react";
import "../common/skeleton.css";

export default function PortfolioReviewSkeleton() {
  return (
    <div className="flex flex-col gap-3 border-b-2 pb-5">
      <div className="skeleton bg-lightgray-sunsu w-full after:pb-[75%] after:block " />
      <div className="flex justify-between">
        <div className="skeleton bg-lightgray-sunsu w-[20%] after:pb-[15%] after:block " />
        <div className="skeleton bg-lightgray-sunsu w-[10%] after:pb-[15%] after:block " />
      </div>
      <div className="skeleton bg-lightgray-sunsu w-full after:pb-[20%] after:block " />
    </div>
  );
}
