import { ReactComponent as SearchOutlinedIcon } from "../../assets/search-03.svg";
import { ReactComponent as LogoIcon } from "../../assets/logo-02.svg";
import HeaderRow from "../common/HeaderRow";
import { scrollToTop } from "../../utils/convert";

const MainHeaderRow = ({ handleOpenSearchBar }) => {
  return (
    <HeaderRow>
      <div className="flex justify-between items-center w-full px-1">
        <button onClick={scrollToTop}>
          <div className="">
            <LogoIcon className="my-auto h-[15px] w-[80px]" />
          </div>
        </button>
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
