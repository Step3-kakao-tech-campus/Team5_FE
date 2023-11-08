import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openSeverErrorBottomSheet } from "../utils/handleBottomSheet";

export default function useDefaultErrorHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultErrorHandler = (error) => {
    switch (error?.response?.status) {
      case 500:
        openSeverErrorBottomSheet(dispatch);
        break;
      case 404:
        navigate("/404", { replace: true });
        break;
      default:
        break;
    }
  };

  return { defaultErrorHandler };
}
