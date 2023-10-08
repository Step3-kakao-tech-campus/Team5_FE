import PortfolioCard from "./PortfolioCard";

const PortfolioGrid = ({ portfolios, loading }) => {
  return (
    <div className="portfolio-grid grid grid-cols-2 gap-[11px] py-[11px] px-[11px] w-full">
      {portfolios?.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          portfolio={portfolio}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default PortfolioGrid;
