import React from "react";
import { useQuery } from "react-query";
import { getPortfolioSelf } from "../apis/portfolio";
import Spinner from "../components/common/atoms/Spinner";
import CreatePortfolioHeader from "../components/createportfolio/CreatePortfolioHeader";
import CreatePortfolioTemplate from "../components/createportfolio/CreatePortfolioTemplate";
import UpdatePortfolioTemplate from "../components/createportfolio/UpdatePortfolioTemplate";
import usePreventGoBack from "../hooks/usePreventGoBack";
import usePreventRefresh from "../hooks/usePreventRefresh";
import useDefaultErrorHandler from "../hooks/useDefaultErrorHandler";

export default function CreatePortfolioPage() {
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const { isLoading, data: portfolio } = useQuery(
    ["portfolios/self"],
    getPortfolioSelf,
    {
      keepPreviousData: true,
      onError: (error) => {
        defaultErrorHandler(error);
      },
    },
  );

  usePreventRefresh();
  usePreventGoBack();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );
  }
  console.log(portfolio);
  return (
    <div className="w-full h-full">
      <CreatePortfolioHeader />
      {!isLoading && portfolio?.plannerName ? (
        <UpdatePortfolioTemplate portfolio={portfolio} />
      ) : (
        <CreatePortfolioTemplate />
      )}
    </div>
  );
}
