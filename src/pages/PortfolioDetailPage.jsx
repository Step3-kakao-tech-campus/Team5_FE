import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getPortfolioDetail } from "../apis/portfolio";
import PortfolioDetailTemplate from "../components/portfolios/PortfolioDetailTemplate";
import GNBBOX from "../components/common/GNBBOX";

const PortfolioDetailPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery(`portfolio/${id}`, () =>
    getPortfolioDetail(id),
  );
  const portfolio = data?.response;

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full h-full overflow-y-auto">
        {portfolio && <PortfolioDetailTemplate portfolio={portfolio} />}
      </div>
      <GNBBOX />
    </div>
  );
};

export default PortfolioDetailPage;
