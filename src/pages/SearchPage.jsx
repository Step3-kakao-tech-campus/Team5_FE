import React from "react";
import GNBBOX from "../components/common/GNBBOX";
import PortfolioTemplate from "../components/portfolios/PortfolioTemplate";

export default function SearchPage() {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full h-full">
        <PortfolioTemplate />
      </div>
      <GNBBOX />
    </div>
  );
}
