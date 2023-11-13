import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { openBottomSheet } from "../store/slices/bottomSheetSlice";

export default function useOpenBottomSheet() {
  const dispatch = useDispatch();
  const openBottomSheetHandler = useCallback(
    ({ bottomSheet, message = "" }) => {
      dispatch(
        openBottomSheet({
          bottomSheetType: bottomSheet,
          isOpen: true,
          message,
        }),
      );
    },
    [dispatch],
  );
  return { openBottomSheetHandler };
}
