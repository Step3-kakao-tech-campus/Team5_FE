import { useEffect, useRef } from "react";
import useFetchFavorites from "../../hooks/useFetchFavorites";
import Spinner from "../common/atoms/Spinner";
import Container from "../common/atoms/Container";
import PortfolioGrid from "../portfolios/PortfolioGrid";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";

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
    isFetching,
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

  if (isLoading) return <Spinner />;

  console.log(favorites);

  return (
    <>
      <Container>
        <PortfolioGrid portfolios={favorites} isFetching={isFetching} />
      </Container>
      <div ref={bottomObserver} />
    </>
  );
};

export default FavoriteListTemplate;
