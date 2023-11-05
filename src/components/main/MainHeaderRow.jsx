import { ReactComponent as SearchOutlinedIcon } from "../../assets/search-03.svg";
import HeaderRow from "../common/HeaderRow";

const MainHeaderRow = ({ handleOpenSearchBar }) => {
  return (
    <HeaderRow>
      <div className="flex justify-between items-center w-full px-1">
        <div className="my-auto font-['Comfortaa'] font-bold text-2xl text-blue-sunsu">
          sunsu
        </div>
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
