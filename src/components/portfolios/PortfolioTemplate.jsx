import { useEffect, useRef } from "react";
import PortfolioGrid from "./PortfolioGrid";
import Container from "../common/atoms/Container";
import useFetchPortfolios from "../../hooks/useFetchPortfolios";

const PortfolioTemplate = () => {
  const bottomObserver = useRef(null);
  const {
    isFetchingNextPage, // 다음 페이지를 가져오는 요청이 진행 중인지 여부
    error,
    hasNextPage,
    // isLoading,
    fetchNextPage,
    portfolios,
    isFetching,
  } = useFetchPortfolios();

  useEffect(() => {
    // console.log("MainPortfolioTemplate portfolios", portfolios);
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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, portfolios]);

  useEffect(() => {
    if (error) {
      console.error(error.message);
      alert("서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
    }
  }, [error]);

  return (
    <>
      <Container>
        <div className="py-[12px] pl-[20px]">
          <h1 className="text-lg font-bold">웨딩플래너 탐색</h1>
        </div>
        <div>
          <PortfolioGrid portfolios={portfolios} isFetching={isFetching} />
        </div>
      </Container>
      <div ref={bottomObserver} />
    </>
  );
};

export default PortfolioTemplate;
