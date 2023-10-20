import React from "react";
import { Outlet } from "react-router-dom";
import GNB from "../components/common/GNB";

export default function MainLayout() {
  return (
    <>
      <Outlet />
      <GNB />
    </>
  );
}
