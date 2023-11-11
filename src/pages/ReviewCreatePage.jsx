import React from "react";
import ReviewCreateHeader from "../components/review/ReviewCreateHeader";
import ReviewCreateTemplate from "../components/review/ReviewCreateTemplate";
import usePreventGoBack from "../hooks/usePreventGoBack";
import usePreventRefresh from "../hooks/usePreventRefresh";

export default function ReviewCreatePage() {
  usePreventRefresh();
  usePreventGoBack();

  return (
    <div className="w-full h-full">
      <ReviewCreateHeader />
      <ReviewCreateTemplate />
    </div>
  );
}
