import React from "react";
import { useQuery } from "react-query";
import { getPortfolioSelf } from "../apis/portfolio";
import Spinner from "../components/common/atoms/Spinner";
import CreatePortfolioHeader from "../components/createportfolio/CreatePortfolioHeader";
import CreatePortfolioTemplate from "../components/createportfolio/CreatePortfolioTemplate";

export default function CreatePortfolioPage() {
  const { isLoading, data } = useQuery(["portfolios/self"], getPortfolioSelf);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="w-full h-full">
      <CreatePortfolioHeader />
      {data && <CreatePortfolioTemplate data={data} />}
    </div>
  );
}
