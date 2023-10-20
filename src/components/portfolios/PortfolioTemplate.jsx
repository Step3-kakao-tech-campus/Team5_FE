import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetchPortfolios from "../../hooks/useFetchPortfolios";
import Container from "../common/atoms/Container";
import Spinner from "../common/atoms/Spinner";
import PortfolioGrid from "./PortfolioGrid";

const PortfolioTemplate = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const location = searchParams.get("location");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const navigate = useNavigate();
  const bottomObserver = useRef(null);
  const {
    isFetchingNextPage, // 다음 페이지를 가져오는 요청이 진행 중인지 여부
    error,
    hasNextPage,
    isLoading,
    fetchNextPage,
    portfolios,
    isFetching,
  } = useFetchPortfolios({ name, location, minPrice, maxPrice });

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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (error) {
      console.error(error.message);
      alert("서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
      navigate("/");
    }
  }, [error]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Container>
        <div>
          <PortfolioGrid portfolios={portfolios} isFetching={isFetching} />
        </div>
      </Container>
      <div ref={bottomObserver} />
    </>
  );
};

export default PortfolioTemplate;
