import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
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
      refetchOnWindowFocus: true,
    },
  );

  useEffect(() => {
    if (infiniteQuery.data) {
      setFavorites(infiniteQuery.data?.pages.flat());
    }
  }, [infiniteQuery.data]);

  return {
    favorites,
    setFavorites,
    ...infiniteQuery,
  };
};

export default useFetchFavorites;
