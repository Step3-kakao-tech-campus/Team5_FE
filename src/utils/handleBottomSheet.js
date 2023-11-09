import { openBottomSheet } from "../store/slices/bottomSheetSlice";

export function openLoginBottomSheet(dispatch) {
  dispatch(
    openBottomSheet({ bottomSheetType: "loginBottomSheet", isOpen: true }),
  );
}

export function openSeverErrorBottomSheet(dispatch) {
  dispatch(
    openBottomSheet({
      bottomSheetType: "serverErrorBottomSheet",
      isOpen: true,
    }),
  );
}

export function openNavigateReviewBottomSheet(dispatch) {
  dispatch(
    openBottomSheet({
      bottomSheetType: "navigateReviewBottomSheet",
      isOpen: true,
    }),
  );
}

export function openDeleteReviewBottomSheet(dispatch) {
  dispatch(
    openBottomSheet({
      bottomSheetType: "deleteReviewBottomSheet",
      isOpen: true,
    }),
  );
}

export function openMessageBottomSheet(dispatch, message) {
  dispatch(
    openBottomSheet({
      bottomSheetType: "messageBottomSheet",
      isOpen: true,
      message,
    }),
  );
}
