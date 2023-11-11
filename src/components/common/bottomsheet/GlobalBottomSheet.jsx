import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeBottomSheet } from "../../../store/slices/bottomSheetSlice";
import DeleteReviewBottomSheet from "../../review/DeleteReviewBottomSheet";
import ForbiddenBottomSheet from "./ForbiddenBottomSheet";
import MessageBottomSheet from "./MessageBottomSheet";
import NavigateReviewBottomSheet from "./NavigateReviewBottomSheet";
import RequiredLoginBottomSheet from "./RequiredLoginBottomSheet";
import RouteBottomSheet from "./RouteBottomSheet";
import ServerErrorBottomSheet from "./ServerErrorBottomSheet";

export default function GlobalBottomSheet() {
  const { bottomSheetType, isOpen, message } = useSelector(
    (state) => state.bottomSheet,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    {
      type: "forbiddenBottomSheet",
      component: (
        <ForbiddenBottomSheet onClose={() => dispatch(closeBottomSheet())} />
      ),
    },
    {
      type: "routeBottomSheet",
      component: (
        <RouteBottomSheet
          message={message}
          onClose={() => {
            dispatch(closeBottomSheet());
            navigate("/profile");
          }}
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
