import React from "react";
import GNBBOX from "../components/common/GNBBOX";
import PortfolioTemplate from "../components/portfolios/PortfolioTemplate";
import SearchHeaderRow from "../components/portfolios/SearchHeaderRow";

export default function SearchPage() {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full h-full">
        <SearchHeaderRow />
        <PortfolioTemplate />
      </div>
      <GNBBOX />
    </div>
  );
}
