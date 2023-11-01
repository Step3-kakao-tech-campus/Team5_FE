import { HiFilter, HiOutlineFilter } from "react-icons/hi";
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
        <div className="flex gap-1 items-center">
          <button onClick={handleFilterForm}>
            {isFilterFormOpen ? (
              <HiFilter size={20} />
            ) : (
              <HiOutlineFilter size={20} />
            )}
          </button>
          <button onClick={handleOpenSearchBar}>
            <SearchOutlinedIcon className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </HeaderRow>
  );
};

export default SearchHeaderRow;
