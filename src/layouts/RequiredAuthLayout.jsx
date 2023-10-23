import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import GNB from "../components/common/GNB";
import GNBBOX from "../components/common/GNBBOX";

export default function RequiredAuthLayout() {
  const { isLogged } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) {
      // 뒤로가기 허용을 위해 replace 사용
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div>
      {isLogged && (
        <>
          <Outlet />
          <GNBBOX />
          <GNB />
        </>
      )}
    </div>
  );
}
