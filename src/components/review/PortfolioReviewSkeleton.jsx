import React from "react";
import "../common/skeleton.css";

export default function PortfolioReviewSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="skeleton w-full after:pb-[35%] after:block rounded-[10px]" />
      <div className="flex justify-between">
        <div className="skeleton w-[20%] after:pb-[15%] after:block rounded-[5px]" />
        <div className="skeleton w-[10%] after:pb-[15%] after:block rounded-[5px]" />
      </div>
      <div className="skeleton w-full after:pb-[15%] after:block rounded-[10px]" />
    </div>
  );
}
