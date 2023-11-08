import React from "react";
import { useQuery } from "react-query";
import { getPortfolioSelf } from "../apis/portfolio";
import Spinner from "../components/common/atoms/Spinner";
import CreatePortfolioHeader from "../components/createportfolio/CreatePortfolioHeader";
import CreatePortfolioTemplate from "../components/createportfolio/CreatePortfolioTemplate";
import UpdatePortfoliotemplate from "../components/createportfolio/UpdatePortfolioTemplate";
import usePreventGoBack from "../hooks/usePreventGoBack";
import usePreventRefresh from "../hooks/usePreventRefresh";
import useDefaultErrorHandler from "../hooks/useDefaultErrorHander";

export default function CreatePortfolioPage() {
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const {
    isLoading,
    data: portfolio,
    error,
  } = useQuery(["portfolios/self"], getPortfolioSelf, {
    keepPreviousData: true,
  });

  usePreventRefresh();
  usePreventGoBack();

  if (error) {
    defaultErrorHandler(error);
  }
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
        <UpdatePortfoliotemplate portfolio={portfolio} />
      ) : (
        <CreatePortfolioTemplate />
      )}
    </div>
  );
}
