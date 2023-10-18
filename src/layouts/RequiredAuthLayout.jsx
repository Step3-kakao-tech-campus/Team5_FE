import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import GNB from "../components/common/GNB";

export default function RequiredAuthLayout() {
  const { isLogged } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isLogged) {
      // 뒤로가기 허용을 위해 replace 사용
      window.location.replace("/login");
    }
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div className="w-screen flex justify-center bg-blue-50">
        <div className="max-w-[576px] min-h-screen w-full h-full bg-white relative">
          {isLogged && (
            <>
              <Outlet />
              <GNB />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
