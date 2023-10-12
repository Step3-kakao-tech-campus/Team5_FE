import React from "react";
import PortfolioTemplate from "../components/portfolios/PortfolioTemplate";
import GNBBOX from "../components/common/GNBBOX";

export default function SearchPage() {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full h-full overflow-y-auto">
        <PortfolioTemplate />
      </div>
      <GNBBOX />
    </div>
  );
}
