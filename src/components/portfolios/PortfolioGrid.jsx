import PortfolioCard from "./PortfolioCard";
import SkeletonCard from "../common/atoms/SkeletonCard";

const PortfolioGrid = ({ portfolios, isFetchingNextPage, setFavorites }) => {
  return (
    <div className="portfolio-grid grid grid-cols-2 gap-[6px] p-[6px] w-full">
      {portfolios?.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          portfolio={portfolio}
          setFavorites={setFavorites}
        />
      ))}
      {isFetchingNextPage && (
        <>
          <SkeletonCard /> <SkeletonCard />
          <SkeletonCard /> <SkeletonCard />
        </>
      )}
    </div>
  );
};

export default PortfolioGrid;
