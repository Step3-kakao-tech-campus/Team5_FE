import React from "react";
import GNBBOX from "../components/common/GNBBOX";
import MainCarousel from "../components/main/MainCarousel";

export default function MainPage() {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full h-full overflow-x-hidden overflow-y-auto">
        <MainCarousel />
      </div>
      <GNBBOX />
    </div>
  );
}
