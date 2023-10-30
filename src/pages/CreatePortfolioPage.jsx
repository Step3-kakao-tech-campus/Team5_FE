import React from "react";
import { useQuery } from "react-query";
import { getPortfolioSelf } from "../apis/portfolio";
import CreatePortfolioHeader from "../components/createportfolio/CreatePortfolioHeader";
import CreatePortfolioTemplate from "../components/createportfolio/CreatePortfolioTemplate";

export default function CreatePortfolioPage() {
  const { data } = useQuery(["portfolios/self"], getPortfolioSelf);

  return (
    <div className="w-full h-full">
      <CreatePortfolioHeader />
      {data && <CreatePortfolioTemplate data={data} />}
    </div>
  );
}
