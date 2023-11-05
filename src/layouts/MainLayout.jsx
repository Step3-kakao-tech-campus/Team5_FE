import React from "react";
import { Outlet } from "react-router-dom";
import GNB from "../components/common/GNB";
import GNBBOX from "../components/common/GNBBOX";

export default function MainLayout() {
  return (
    <>
      <Outlet />
      <GNBBOX />
      <GNB />
    </>
  );
}
