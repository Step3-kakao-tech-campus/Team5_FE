import HeaderRow from "../common/HeaderRow";
import { ReactComponent as SearchOutlinedIcon } from "../../assets/search-03.svg";

const SearchHeaderRow = ({ handleOpenSearchBar }) => {
  return (
    <HeaderRow>
      <div className="flex justify-between items-center w-full px-1">
        <div className="my-auto font-medium">웨딩플래너 탐색</div>
        <button onClick={() => {}}>
          <SearchOutlinedIcon
            className="w-[18px] h-[18px]"
            onClick={handleOpenSearchBar}
          />
        </button>
      </div>
    </HeaderRow>
  );
};

export default SearchHeaderRow;
