import Card from "../common/atoms/Card";
import { comma } from "../../utils/convert";
import SquarePhoto from "../common/atoms/SquarePhoto";
import { ReactComponent as HeartOutlinedIcon } from "../../assets/heart-03.svg";
import { ReactComponent as HeartIcon } from "../../assets/heart-04.svg";
import { ReactComponent as StarIcon } from "../../assets/star-02.svg";

const PortfolioCard = ({ portfolio }) => {
  return (
    <Card to={`/portfolios/${portfolio.id}`} className="portfolio-card">
      <SquarePhoto
        src={portfolio.image.substring(1, portfolio.image.length)}
        alt={portfolio.plannerName}
        className="portfolio-image"
      />
      <div className="py-[9px] px-[8px]">
        <div className="flex text-[12px] whitespace-nowrap">
          <span className="planner-name mr-auto">
            <em className="emph-name font-bold not-italic">
              {portfolio.plannerName}
            </em>{" "}
            플래너
          </span>
          <span className="planner-location">{portfolio.location}</span>
        </div>
        <div className="planner-title pt-[1px] h-[33px] text-xs text-gray-sunsu line-clamp-2">
          {portfolio.title}
        </div>
        <div className="planner-price flex pt-[1px] text-xs">
          <em className="emph-price font-bold not-italic">
            {comma(portfolio.price)}
          </em>
          원
        </div>
        <div className="planner-contract-count flex pt-[1px] text-xs text-blue-sunsu items-center">
          {portfolio.avgStars && (
            <>
              <span className="">
                <StarIcon className="w-[12px] h-[12px] mb-[1px] mr-[3px] justify-center" />
              </span>
              <span className="text-black mr-[3px]">
                {portfolio.avgStars.toFixed(1)}
                {" |"}
              </span>
            </>
          )}
          <span className="mr-auto">
            <em className="emph-count font-bold not-italic">
              {comma(portfolio.contractCount)}
            </em>
            건 매칭
          </span>
          <span className="">
            {portfolio.isLiked ? (
              <HeartIcon className="w-[11px] h-[10px]" />
            ) : (
              <HeartOutlinedIcon className="w-[11px] h-[10px]" />
            )}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default PortfolioCard;
