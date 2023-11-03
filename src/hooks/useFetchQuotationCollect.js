import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import _ from "lodash";
import { getQuotationCollectList } from "../apis/quotation";

const UseFetchQuotationCollect = () => {
  const [quotations, setQuotations] = useState([]);
  const infiniteQuery = useInfiniteQuery(
    ["quotations"],
    ({ pageParam = 1 }) => getQuotationCollectList(pageParam),
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
      const allFetchedPortfolios = infiniteQuery.data?.pages.flatMap(
        (page) => page.quotations,
      );
      setQuotations((prev) =>
        _.unionBy([...prev, ...allFetchedPortfolios], "id"),
      );
    }
  }, [infiniteQuery.data]);

  return {
    quotations,
    ...infiniteQuery,
  };
};

export default UseFetchQuotationCollect;
