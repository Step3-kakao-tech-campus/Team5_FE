import React from "react";
import { Outlet } from "react-router-dom";
import GNB from "../components/common/GNB";

export default function MainLayout() {
  return (
    <div className=" w-screen flex justify-center bg-zinc-50">
      <div className=" max-w-[576px] w-full h-full bg-white relative">
        <Outlet />
        <GNB />
      </div>
    </div>
  );
}
