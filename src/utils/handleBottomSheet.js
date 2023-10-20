import { openBottomSheet } from "../store/slices/bottomSheetSlice";

export function openLoginBottomSheet(dispatch) {
  dispatch(
    openBottomSheet({ bottomSheetType: "loginBottomSheet", isOpen: true }),
  );
}
