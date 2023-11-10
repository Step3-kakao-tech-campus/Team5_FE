import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import _ from "lodash";
import { getFavoriteList } from "../apis/favorite";

const useFetchFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const infiniteQuery = useInfiniteQuery(
    ["favorites"],
    ({ pageParam = 0 }) => getFavoriteList(pageParam),
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
      const allFetchedFavorites = infiniteQuery.data?.pages.flat();
      setFavorites((prev) =>
        _.unionBy([...prev, ...allFetchedFavorites], "id"),
      );
    }
  }, [infiniteQuery.data]);

  return {
    favorites,
    setFavorites,
    ...infiniteQuery,
  };
};

export default useFetchFavorites;
