import _ from "lodash";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getPortfolioReviews } from "../apis/review";

const useFetchPortfolioReviews = (plannerId) => {
  const [portfolioReviews, setPortfolioReviews] = useState([]);
  const infiniteQuery = useInfiniteQuery(
    ["portfolio/reviews"],
    ({ pageParam = 0 }) => getPortfolioReviews({ plannerId, pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.length < 10) {
          return undefined;
        }
        return allPages.length;
      },
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    if (infiniteQuery.data) {
      const allFetchedFavorites = infiniteQuery.data?.pages.flat();
      setPortfolioReviews((prev) =>
        _.unionBy([...prev, ...allFetchedFavorites], "id"),
      );
    }
  }, [infiniteQuery.data]);

  return {
    portfolioReviews,
    ...infiniteQuery,
  };
};

export default useFetchPortfolioReviews;
