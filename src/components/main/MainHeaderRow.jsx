import { ReactComponent as SearchOutlinedIcon } from "../../assets/search-01.svg";
import HeaderRow from "../common/HeaderRow";

const MainHeaderRow = ({ handleOpenSearchBar }) => {
  return (
    <HeaderRow>
      <div className="flex justify-between items-center w-full px-3">
        <div className="my-auto font-serif">Sunsu</div>
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

export default MainHeaderRow;
