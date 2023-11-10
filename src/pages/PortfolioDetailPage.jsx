import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPortfolioDetail } from "../apis/portfolio";
import Spinner from "../components/common/atoms/Spinner";
import PortfolioDetailHeader from "../components/portfoliodetail/PortfolioDetailHeader";
import PortfolioDetailTemplate from "../components/portfoliodetail/PortfolioDetailTemplate";
import useDefaultErrorHandler from "../hooks/useDefaultErrorHandler";

// done test
const PortfolioDetailPage = () => {
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const { id } = useParams();
  const {
    data: portfolio,
    error,
    isLoading,
  } = useQuery([`portfolio/${id}`], () => getPortfolioDetail(id));

  useEffect(() => {
    if (error) {
      defaultErrorHandler(error);
    }
  }, [error]);
  if (isLoading) return <Spinner />;

  return (
    <div className="flex w-full h-full flex-col">
      <PortfolioDetailHeader />
      {portfolio && <PortfolioDetailTemplate portfolio={portfolio} />}
    </div>
  );
};

export default PortfolioDetailPage;
