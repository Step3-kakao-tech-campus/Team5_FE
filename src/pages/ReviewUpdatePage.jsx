import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getReviewDetail } from "../apis/review";
import Spinner from "../components/common/atoms/Spinner";
import ReviewUpdateHeader from "../components/review/ReviewUpdateHeader";
import ReviewUpdateTemplate from "../components/review/ReviewUpdateTemplate";
import usePreventGoBack from "../hooks/usePreventGoBack";
import usePreventRefresh from "../hooks/usePreventRefresh";

export default function ReviewUpdatePage() {
  const { reviewId } = useParams();
  const queryClient = useQueryClient();
  const { data: review, isLoading } = useQuery(
    [`/reviews/${reviewId}`],
    () => getReviewDetail(parseInt(reviewId, 10)),
    {
      onError: (error) => {
        console.log(error);
      },
    },
  );

  useEffect(() => {
    queryClient.setQueryData([`/reviews/${reviewId}`], null);
  }, []);

  usePreventRefresh();
  usePreventGoBack();

  if (isLoading) return <Spinner />;
  return (
    <div className="w-full h-full">
      <ReviewUpdateHeader />
      {review && <ReviewUpdateTemplate review={review} />}
    </div>
  );
}
