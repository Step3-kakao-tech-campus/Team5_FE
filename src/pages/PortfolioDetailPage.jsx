import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPortfolioDetail } from "../apis/portfolio";
import Spinner from "../components/common/atoms/Spinner";
import PortfolioDetailHeader from "../components/portfoliodetail/PortfolioDetailHeader";
import PortfolioDetailTemplate from "../components/portfoliodetail/PortfolioDetailTemplate";

const PortfolioDetailPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery([`portfolio/${id}`], () =>
    getPortfolioDetail(id),
  );
  const portfolio = data?.response;

  useEffect(() => {
    if (error) {
      console.error(error.message);
      alert("서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
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
