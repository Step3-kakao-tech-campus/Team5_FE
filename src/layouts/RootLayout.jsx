import React from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="w-screen flex justify-center bg-blue-50">
      <div className="max-w-[576px] min-h-screen w-full h-full bg-white relative">
        <Outlet />
      </div>
    </div>
  );
}
