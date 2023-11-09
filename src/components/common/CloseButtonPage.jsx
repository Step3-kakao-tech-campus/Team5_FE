import { ReactComponent as CloseIcon } from "../../assets/close-01.svg";
import HeaderRow from "./HeaderRow";
import useScrollToTop from "../../hooks/useScrollToTop";

const CloseButtonPage = ({ headerName = "", onClose, children }) => {
  useScrollToTop();

  return (
    <>
      <HeaderRow>
        <div className="text-sm w-full flex items-center justify-center font-medium">
          {headerName}
          <button
            className="cursor-pointer absolute right-[20px]"
            onClick={onClose}
          >
            <CloseIcon className="w-[14px] h-[14px]" />
          </button>
        </div>
      </HeaderRow>
      <div className="p-[10px]">{children}</div>
    </>
  );
};

export default CloseButtonPage;
