import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetchPortfolios from "../../hooks/useFetchPortfolios";
import Container from "../common/atoms/Container";
import Spinner from "../common/atoms/Spinner";
import PortfolioGrid from "./PortfolioGrid";
import PortfolioSearchBar from "./PortfolioSearchBar";
import SearchHeaderRow from "./SearchHeaderRow";

const PortfolioTemplate = () => {
  const navigate = useNavigate();
  const bottomObserver = useRef(null);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  // const [location, setLocation] = useState("");
  // const [minPrice, setMinPrice] = useState(1_000_000);
  // const [maxPrice, setMaxPrice] = useState(10_000_000);
  const queryName = useRef(searchParams.get("name"));
  const queryLocation = useRef(searchParams.get("location"));
  const queryMinPrice = useRef(searchParams.get("minPrice"));
  const queryMaxPrice = useRef(searchParams.get("maxPrice"));

  const {
    isFetchingNextPage, // 다음 페이지를 가져오는 요청이 진행 중인지 여부
    error,
    hasNextPage,
    isLoading,
    fetchNextPage,
    portfolios,
    isFetching,
  } = useFetchPortfolios({
    name: queryName.current,
    location: queryLocation.current,
    minPrice: queryMinPrice.current,
    maxPrice: queryMaxPrice.current,
  });

  const handleOpenSearchBar = () => {
    setIsSearchBarOpen(true);
  };
  const handleCloseSearchBar = () => {
    setIsSearchBarOpen(false);
  };

  const onKeyDownEnter = (e) => {
    // 한글만 두 번 입력되는 문제가 발생 -> 한글은 자음과 모음의 조합으로 한 음절이 만들어지기 때문에 조합문자이고, 영어는 조합문자가 아니다.
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") {
      handleCloseSearchBar();
      queryName.current = name;
    }
  };

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
      console.error(error.message);
      alert("서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
      navigate("/");
    }
  }, [error]);

  if (isLoading) return <Spinner />;

  return (
    <>
      {isSearchBarOpen && (
        <PortfolioSearchBar
          handleCloseSearchBar={handleCloseSearchBar}
          name={name}
          setName={setName}
          onKeyDownEnter={onKeyDownEnter}
        />
      )}
      {!isSearchBarOpen && (
        <SearchHeaderRow handleOpenSearchBar={handleOpenSearchBar} />
      )}
      <Container>
        <PortfolioGrid portfolios={portfolios} isFetching={isFetching} />
      </Container>
      <div ref={bottomObserver} />
    </>
  );
};

export default PortfolioTemplate;
