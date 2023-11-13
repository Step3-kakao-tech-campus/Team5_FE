import React from "react";
import { useQuery } from "react-query";
import { getReviewsListSelf } from "../apis/review";
import Spinner from "../components/common/atoms/Spinner";
import NoReviewList from "../components/review/NoReviewList";
import ReviewListHeader from "../components/review/ReviewListHeader";
import ReviewListTemplate from "../components/review/ReviewListTemplate";
import useDefaultErrorHandler from "../hooks/useDefaultErrorHandler";

export default function ReviewListPage() {
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const { data, isLoading } = useQuery(["/reviews/all"], getReviewsListSelf, {
    onError: (error) => {
      defaultErrorHandler(error);
    },
  });

  if (isLoading) return <Spinner />;
  return (
    <div className="w-full h-full">
      <ReviewListHeader />
      {data?.reviews?.length === 0 ? (
        <NoReviewList />
      ) : (
        <ReviewListTemplate reviews={data.reviews} />
      )}
    </div>
  );
}
