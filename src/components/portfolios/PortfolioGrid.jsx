import PortfolioCard from "./PortfolioCard";
import SkeletonCard from "../common/atoms/SkeletonCard";

const PortfolioGrid = ({ portfolios, isFetching }) => {
  return (
    <div className="portfolio-grid grid grid-cols-2 gap-[11px] py-[11px] px-[11px] w-full">
      {portfolios?.map((portfolio) => (
        <PortfolioCard key={portfolio.id} portfolio={portfolio} />
      ))}
      {isFetching && (
        <>
          <SkeletonCard /> <SkeletonCard />
          <SkeletonCard /> <SkeletonCard />
        </>
      )}
    </div>
  );
};

export default PortfolioGrid;
