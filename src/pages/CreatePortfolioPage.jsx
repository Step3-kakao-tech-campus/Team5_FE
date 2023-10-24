import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getPortfolioSelf } from "../apis/portfolio";
import GNBBOX from "../components/common/GNBBOX";
import CreatePortfolioTemplate from "../components/createportfolio/CreatePortfolioTemplate";

export default function CreatePortfolioPage() {
  const { data } = useQuery("portfolios", () => {
    getPortfolioSelf();
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex h-full flex-col">
      <div className="w-full h-full">
        <CreatePortfolioTemplate />
      </div>
      <GNBBOX />
    </div>
  );
}
