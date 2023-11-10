import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useFetchPortfolioReviews from "../../hooks/useFetchPortfolioReviews";
import Spinner from "../common/atoms/Spinner";
import PortfolioReviewItem from "./PortfolioReviewItem";
import PortfolioReviewSkeleton from "./PortfolioReviewSkeleton";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";

export default function PortfoliioReviewTemplate() {
  const bottomObserver = useRef(null);
  const { plannerId } = useParams();
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const {
    isFetchingNextPage, // 다음 페이지를 가져오는 요청이 진행 중인지 여부
    error,
    hasNextPage,
    isLoading,
    fetchNextPage,
    portfolioReviews,
  } = useFetchPortfolioReviews(plannerId);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    if (bottomObserver.current && hasNextPage) {
      io.observe(bottomObserver.current);
    }
    return () => {
      io.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (error) {
      defaultErrorHandler(error);
    }
  }, [error]);

  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="w-full h-full flex flex-col gap-2">
        {portfolioReviews.map((review) => (
          <PortfolioReviewItem review={review} key={review.id} />
        ))}
        {isFetchingNextPage && <PortfolioReviewSkeleton />}
      </div>
      <div ref={bottomObserver} />
    </>
  );
}
