import ReviewImageCarousel from "./ReviewImageCarousel";
import ReviewContentRow from "./ReviewContentRow";

export default function PortfolioReviewItem({ review }) {
  return (
    <div className="w-full h-full flex flex-col gap-[5px] pb-5 border-b">
      {/* 이미지 영역 */}
      <div>
        <ReviewImageCarousel review={review} />
      </div>
      {/* 별점 & 커플네임 & 리뷰내용 */}
      <ReviewContentRow review={review} />
    </div>
  );
}
