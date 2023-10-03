import React from "react";
import { useSelector } from "react-redux";
import GNBBOX from "../components/common/GNBBOX";
import ProfileTemplate from "../components/profile/ProfileTemplate";
import RequiredLoginTemplate from "../components/profile/RequiredLoginTemplate";

export default function ProfilePage() {
  const { isLogged } = useSelector((state) => state.user);

  return (
    <div className="flex h-full flex-col">
      <div className="w-full h-full">
        {isLogged ? <ProfileTemplate /> : <RequiredLoginTemplate />}
      </div>
      <GNBBOX />
    </div>
  );
}
