import React from "react";
import { Outlet } from "react-router-dom";
import GNB from "../components/common/GNB";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <div className="flex-grow flex justify-center">
        <div className="max-w-[576px] w-full bg-white relative">
          <Outlet />
        </div>
      </div>
      <div className="flex justify-center sticky bottom-0">
        <div className="max-w-[576px] w-full">
          <GNB />
        </div>
      </div>
    </div>
  );
}
