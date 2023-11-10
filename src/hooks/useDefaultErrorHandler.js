import { useNavigate } from "react-router-dom";
import useOpenBottomSheet from "./useOpenBottomSheet";

export default function useDefaultErrorHandler() {
  const navigate = useNavigate();
  const { openBottomSheetHandler } = useOpenBottomSheet();

  const defaultErrorHandler = (error) => {
    switch (error?.response?.status) {
      case 500:
        openBottomSheetHandler({ bottomSheet: "serverErrorBottomSheet" });
        break;
      case 404:
        navigate("/404", { replace: true });
        break;
      case 403:
        openBottomSheetHandler({ bottomSheet: "forbiddenBottomSheet" });
        break;
      default:
        break;
    }
  };

  return { defaultErrorHandler };
}
