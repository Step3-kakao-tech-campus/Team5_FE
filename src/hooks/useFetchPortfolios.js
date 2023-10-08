import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import _ from "lodash";
import { getPortfolioList } from "../apis/portfolio";

export default function useFetchPortfolios() {
  const [portfolios, setPortfolios] = useState([]);
  const infiniteQuery = useInfiniteQuery(
    ["portfolios"],
    ({ pageParam = 1 }) => getPortfolioList(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < 10) {
          return undefined;
        }
        return allPages.length;
      },
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    if (infiniteQuery.data) {
      const allFetchedPortfolios = infiniteQuery.data.pages.flat();
      setPortfolios((prev) =>
        _.unionBy([...prev, ...allFetchedPortfolios], "id"),
      );
    }
  }, [infiniteQuery.data]);

  return {
    portfolios,
    ...infiniteQuery,
  };
}
