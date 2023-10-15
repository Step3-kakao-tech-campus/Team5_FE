import { useInfiniteQuery } from "react-query";
import { getPortfolioList } from "../apis/portfolio";

export default function useFetchPortfolios() {
  const infiniteQuery = useInfiniteQuery(
    ["portfolios"],
    ({ pageParam = -1 }) => getPortfolioList(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.cursor) {
          return lastPage.cursor;
        }
        return undefined;
      },
      keepPreviousData: true,
    },
  );

  const allFetchedPortfolios = infiniteQuery.data?.pages.flatMap(
    (page) => page.data,
  );

  return {
    portfolios: allFetchedPortfolios,
    ...infiniteQuery,
  };
}
