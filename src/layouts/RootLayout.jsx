import React from "react";
import { Outlet } from "react-router-dom";
import GlobalBottomSheet from "../components/common/bottomsheet/GlobalBottomSheet";

export default function RootLayout() {
  return (
    <div className=" flex justify-center bg-blue-50 w-full ">
      <div className="max-w-[576px] min-h-screen w-full h-full bg-white relative">
        <GlobalBottomSheet />
        <Outlet />
      </div>
    </div>
  );
}
