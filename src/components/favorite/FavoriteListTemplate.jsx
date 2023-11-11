import { useEffect, useRef } from "react";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";
import useFetchFavorites from "../../hooks/useFetchFavorites";
import Container from "../common/atoms/Container";
import Spinner from "../common/atoms/Spinner";
import PortfolioGrid from "../portfolios/PortfolioGrid";
import NoFavoriteList from "./NoFavoriteList";

const FavoriteListTemplate = () => {
  const bottomObserver = useRef(null);
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const {
    isFetchingNextPage, // 다음 페이지를 가져오는 요청이 진행 중인지 여부
    error,
    hasNextPage,
    isLoading,
    fetchNextPage,
    favorites,
    setFavorites,
  } = useFetchFavorites();

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

  console.log("list", favorites);
  if (isLoading) return <Spinner />;

  return (
    <>
      <Container>
        {favorites?.length === 0 ? (
          <NoFavoriteList />
        ) : (
          <PortfolioGrid
            portfolios={favorites}
            isFetchingNextPage={isFetchingNextPage}
            setFavorites={setFavorites}
          />
        )}
      </Container>
      <div ref={bottomObserver} />
    </>
  );
};

export default FavoriteListTemplate;
