import useOpenBottomSheet from "../../hooks/useOpenBottomSheet";
import BackButtonHeader from "../common/BackButtonHeader";

export default function ReviewUpdateHeader() {
  const { openBottomSheetHandler } = useOpenBottomSheet();
  return (
    <BackButtonHeader>
      <span className="w-full text-sm text-center font-medium ">
        리뷰 수정하기
      </span>
      <button
        className="absolute text-sm text-right font-bold right-3 text-red-600"
        onClick={() =>
          openBottomSheetHandler({ bottomSheet: "deleteReviewBottomSheet" })
        }
      >
        삭제하기
      </button>
    </BackButtonHeader>
  );
}
