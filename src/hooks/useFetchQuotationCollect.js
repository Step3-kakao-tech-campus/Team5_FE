import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import _ from "lodash";
import { getQuotationCollectList } from "../apis/quotation";

const UseFetchQuotationCollect = () => {
  const [chats, setChats] = useState([]);
  const infiniteQuery = useInfiniteQuery(
    ["chats"],
    ({ pageParam = 0 }) => getQuotationCollectList(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.chats.length < 10) {
          return undefined;
        }
        return allPages.length;
      },
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    if (infiniteQuery.data) {
      const allFetchedChats = infiniteQuery.data?.pages.flatMap(
        (page) => page.chats,
      );
      setChats((prev) => _.unionBy([...prev, ...allFetchedChats], "chatId"));
    }
  }, [infiniteQuery.data]);

  return {
    chats,
    ...infiniteQuery,
  };
};

export default UseFetchQuotationCollect;
