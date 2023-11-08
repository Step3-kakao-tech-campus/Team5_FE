import { useNavigate } from "react-router-dom";
import ReviewImageCarousel from "./ReviewImageCarousel";
import Button from "../common/atoms/Button";
import ReviewContentRow from "./ReviewContentRow";

const ReviewDetailTemplate = ({ review }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col gap-[5px] pb-5">
      {/* 이미지 영역 */}
      <div>
        <ReviewImageCarousel review={review} />
      </div>
      {/* 별점 & 커플네임 & 리뷰내용 */}
      <ReviewContentRow review={review} />
      <Button
        className="block h-[50px] mt-[15px] mx-[29px] rounded-[10px] text-sm bg-lightskyblue-sunsu font-medium"
        onClick={() => navigate(`/portfolios/${review.portfolioId}`)}
      >
        {review.plannerName} 플래너 포트폴리오 바로가기
      </Button>
    </div>
  );
};

export default ReviewDetailTemplate;
