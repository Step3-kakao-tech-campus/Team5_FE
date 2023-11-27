import { ReactComponent as FilterIcon } from "../../assets/filter-02.svg";
import { ReactComponent as FilterOutlinedIcon } from "../../assets/filter-01.svg";
import { ReactComponent as SearchOutlinedIcon } from "../../assets/search-03.svg";
import HeaderRow from "../common/HeaderRow";

const SearchHeaderRow = ({
  handleOpenSearchBar,
  isFilterFormOpen,
  handleFilterForm,
}) => {
  return (
    <HeaderRow>
      <div className="flex justify-between items-center w-full px-1">
        <div className="my-auto font-medium">웨딩플래너 탐색</div>
        <div className="flex gap-3 items-center">
          <button onClick={handleFilterForm}>
            {isFilterFormOpen ? (
              <FilterIcon
                className="w-[16px] h-[18px]"
                aria-label="필터창 열기"
              />
            ) : (
              <FilterOutlinedIcon
                className="w-[16px] h-[18px]"
                aria-label="필터창 닫기"
              />
            )}
          </button>
          <button onClick={handleOpenSearchBar} aria-label="검색창 열기">
            <SearchOutlinedIcon className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </HeaderRow>
  );
};

export default SearchHeaderRow;
