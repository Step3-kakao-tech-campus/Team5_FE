import React from "react";
import PriceInfoRow from "./PriceInfoRow";

export default function PlannerInfoRow({
  plannerName,
  contractCount,
  location,
  title,
  priceInfo,
}) {
  return (
    <div className="p-5 justify-between">
      <div className="flex whitespace-nowrap">
        <div className="inline mr-auto text-xl">
          <em className="font-bold not-italic">{plannerName}</em> 플래너 |{" "}
          {location}
        </div>
        <div className="inline text-sm text-blue-sunsu">
          <em className="font-bold not-italic">{contractCount}</em>건 매칭
        </div>
      </div>
      <div className="pt-[5px] text-xs text-gray-sunsu">{title}</div>
      <div className="pt-5">
        <PriceInfoRow priceInfo={priceInfo} />
      </div>
    </div>
  );
}
