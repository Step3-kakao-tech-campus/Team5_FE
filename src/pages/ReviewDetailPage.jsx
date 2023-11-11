import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ReviewDetailHeader from "../components/review/ReviewDetailHeader";
import ReviewDetailTemplate from "../components/review/ReviewDetailTemplate";
import { getReviewDetail } from "../apis/review";
import Spinner from "../components/common/atoms/Spinner";
import useDefaultErrorHandler from "../hooks/useDefaultErrorHandler";

const ReviewDetailPage = () => {
  const { reviewId } = useParams();
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const { data: review, isLoading } = useQuery(
    [`/reviews/${reviewId}`],
    () => getReviewDetail(reviewId),
    {
      onError: (error) => {
        defaultErrorHandler(error);
      },
    },
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full h-full">
      <ReviewDetailHeader />
      {review && <ReviewDetailTemplate review={review} />}
    </div>
  );
};

export default ReviewDetailPage;
