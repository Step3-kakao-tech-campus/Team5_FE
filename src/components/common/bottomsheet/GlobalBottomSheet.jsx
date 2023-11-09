import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeBottomSheet } from "../../../store/slices/bottomSheetSlice";
import RequiredLoginBottomSheet from "./RequiredLoginBottomSheet";
import ServerErrorBottomSheet from "./ServerErrorBottomSheet";
import NavigateReviewBottomSheet from "./NavigateReviewBottomSheet";
import DeleteReviewBottomSheet from "../../review/DeleteReviewBottomSheet";
import MessageBottomSheet from "./MessageBottomSheet";

export default function GlobalBottomSheet() {
  const { bottomSheetType, isOpen, message } = useSelector(
    (state) => state.bottomSheet,
  );
  const dispatch = useDispatch();
  const BOTTOMSHEET_COMPONENTS = [
    {
      type: "loginBottomSheet",
      component: (
        <RequiredLoginBottomSheet
          onClose={() => dispatch(closeBottomSheet())}
        />
      ),
    },
    {
      type: "serverErrorBottomSheet",
      component: (
        <ServerErrorBottomSheet onClose={() => dispatch(closeBottomSheet())} />
      ),
    },
    {
      type: "navigateReviewBottomSheet",
      component: (
        <NavigateReviewBottomSheet
          onClose={() => dispatch(closeBottomSheet())}
        />
      ),
    },
    {
      type: "deleteReviewBottomSheet",
      component: (
        <DeleteReviewBottomSheet onClose={() => dispatch(closeBottomSheet())} />
      ),
    },
    {
      type: "messageBottomSheet",
      component: (
        <MessageBottomSheet
          message={message}
          onClose={() => dispatch(closeBottomSheet())}
        />
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
