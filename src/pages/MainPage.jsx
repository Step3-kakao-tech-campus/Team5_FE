import React from "react";
import GNBBOX from "../components/common/GNBBOX";

export default function MainPage() {
  return (
    <div className="flex w-full h-full flex-col">
      {/* 컨텐츠 영역 */}
      <div className="w-full h-full overflow-y-auto">
        <div className="w-full h-[300px] flex items-center justify-center">
          MainPage
        </div>
        <div className="w-full h-[300px] flex items-center justify-center">
          MainPage
        </div>
        <div className="w-full h-[300px] flex items-center justify-center">
          MainPage
        </div>
        <div className="w-full h-[300px] flex items-center justify-center">
          MainPage
        </div>
      </div>
      <GNBBOX />
    </div>
  );
}
