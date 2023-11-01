import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useFetchPortfolios from "../../hooks/useFetchPortfolios";
import { openSeverErrorBottomSheet } from "../../utils/handleBottomSheet";
import Container from "../common/atoms/Container";
import Spinner from "../common/atoms/Spinner";
import PortfolioGrid from "./PortfolioGrid";
import PortfolioSearchBar from "./PortfolioSearchBar";
import SearchHeaderRow from "./SearchHeaderRow";
import FilterForm from "./FilterForm";

const PortfolioTemplate = () => {
  const dispatch = useDispatch();
  const bottomObserver = useRef(null);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isFilterFormOpen, setIsFilterFormOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const [name, setName] = useState(searchParams.get("name") || "");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [prices, setPrices] = useState([0, 10_000_000]);

  const queryName = useRef(searchParams.get("name") || "");
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
  const handleFilterForm = () => {
    setIsFilterFormOpen((prev) => !prev);
  };

  const handleResetFilter = () => {
    setSelectedRegion(null);
    setPrices([0, 10_000_000]);
  };
  const handleApplyFilter = () => {
    queryLocation.current = selectedRegion;
    // eslint-disable-next-line prefer-destructuring
    queryMinPrice.current = prices[0];
    // eslint-disable-next-line prefer-destructuring
    queryMaxPrice.current = prices[1];
    handleFilterForm();
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
      openSeverErrorBottomSheet(dispatch); // 현재 msw에서 가끔씩 404에러 발생을 서버에러로 대체 처리중
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
        <SearchHeaderRow
          handleOpenSearchBar={handleOpenSearchBar}
          isFilterFormOpen={isFilterFormOpen}
          handleFilterForm={handleFilterForm}
        />
      )}
      {isFilterFormOpen && (
        <div className="flex flex-col w-full p-4 gap-4">
          <FilterForm
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            prices={prices}
            setPrices={setPrices}
          />
          <div className="w-full flex items-center gap-3">
            <button
              className=" bg-lightgray-sunsu rounded-[10px] w-full h-[32px]"
              onClick={handleResetFilter}
            >
              필터 초기화
            </button>
            <button
              className=" rounded-[10px] w-full h-[32px] text-white bg-blue-sunsu"
              onClick={handleApplyFilter}
            >
              적용
            </button>
          </div>
        </div>
      )}
      <Container>
        <PortfolioGrid portfolios={portfolios} isFetching={isFetching} />
      </Container>
      <div ref={bottomObserver} />
    </>
  );
};

export default PortfolioTemplate;
