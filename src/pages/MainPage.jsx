import React from "react";
import GNBBOX from "../components/common/GNBBOX";
import MainCarousel from "../components/main/MainCarousel";
import MainHeaderRow from "../components/main/MainHeaderRow";

export default function MainPage() {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full h-full overflow-x-hidden overflow-y-auto">
        <MainHeaderRow />
        <MainCarousel />
      </div>
      <GNBBOX />
    </div>
  );
}
