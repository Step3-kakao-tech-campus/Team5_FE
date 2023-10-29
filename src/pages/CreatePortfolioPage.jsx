import React from "react";
import { useQuery } from "react-query";
import { getPortfolioSelf } from "../apis/portfolio";
import CreatePortfolioTemplate from "../components/createportfolio/CreatePortfolioTemplate";
import CreatePortfolioHeader from "../components/createportfolio/CreatePortfolioHeader";

export default function CreatePortfolioPage() {
  const { data } = useQuery(["portfolios/self"], getPortfolioSelf);
  return (
    <div className="w-full h-full">
      <CreatePortfolioHeader />
      {data && <CreatePortfolioTemplate />}
    </div>
  );
}
