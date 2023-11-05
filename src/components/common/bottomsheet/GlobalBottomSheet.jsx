import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeBottomSheet } from "../../../store/slices/bottomSheetSlice";
import RequiredLoginBottomSheet from "./RequiredLoginBottomSheet";
import ServerErrorBottomSheet from "./ServerErrorBottomSheet";
import NavigateReviewBottomSheet from "./NavigateReviewBottomSheet";
import DeleteReviewBottomSheet from "../../review/DeleteReviewBottomSheet";

export default function GlobalBottomSheet() {
  const { bottomSheetType, isOpen } = useSelector((state) => state.bottomSheet);
  const dispatch = useDispatch();

  const BOTTOMSHEET_TYPES = {
    LOGIN: "loginBottomSheet",
    SERVER_ERROR: "serverErrorBottomSheet",
    NAVIGATE_REVIEW: "navigateReviewBottomSheet",
    DELETE_REVIEW: "deleteReviewBottomSheet",
  };

  const BOTTOMSHEET_COMPONENTS = [
    {
      type: BOTTOMSHEET_TYPES.LOGIN,
      component: (
        <RequiredLoginBottomSheet
          onClose={() => dispatch(closeBottomSheet())}
        />
      ),
    },
    {
      type: BOTTOMSHEET_TYPES.SERVER_ERROR,
      component: (
        <ServerErrorBottomSheet onClose={() => dispatch(closeBottomSheet())} />
      ),
    },
    {
      type: BOTTOMSHEET_TYPES.NAVIGATE_REVIEW,
      component: (
        <NavigateReviewBottomSheet
          onClose={() => dispatch(closeBottomSheet())}
        />
      ),
    },
    {
      type: BOTTOMSHEET_TYPES.DELETE_REVIEW,
      component: (
        <DeleteReviewBottomSheet onClose={() => dispatch(closeBottomSheet())} />
      ),
    },
  ];
  if (!isOpen) return null;

  const findBottomSheetComponent = BOTTOMSHEET_COMPONENTS.find((component) => {
    return component.type === bottomSheetType;
  });

  const renderBottomSheetComponent = () => {
    return findBottomSheetComponent.component;
  };

  return <>{renderBottomSheetComponent()}</>;
}
