import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { getPortfolioDetail } from "../apis/portfolio";
import PortfolioDetailTemplate from "../components/portfolios/PortfolioDetailTemplate";
import GNBBOX from "../components/common/GNBBOX";
import Spinner from "../components/common/atoms/Spinner";

const PortfolioDetailPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery(`portfolio/${id}`, () =>
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
      <div className="w-full h-full overflow-x-hidden">
        {portfolio && <PortfolioDetailTemplate portfolio={portfolio} />}
      </div>
      <GNBBOX />
    </div>
  );
};

export default PortfolioDetailPage;
