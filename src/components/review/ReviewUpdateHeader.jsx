import { useDispatch } from "react-redux";
import { openDeleteReviewBottomSheet } from "../../utils/handleBottomSheet";
import BackButtonHeader from "../common/BackButtonHeader";

export default function ReviewUpdateHeader() {
  const dispatch = useDispatch();
  return (
    <BackButtonHeader>
      <span className="w-full text-sm text-center font-medium ">
        리뷰 수정하기
      </span>
      <button
        className="absolute text-sm text-right font-bold right-3 text-red-600"
        onClick={() => openDeleteReviewBottomSheet(dispatch)}
      >
        삭제하기
      </button>
    </BackButtonHeader>
  );
}
