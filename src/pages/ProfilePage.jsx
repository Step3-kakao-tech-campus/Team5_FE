import React from "react";
import GNBBOX from "../components/common/GNBBOX";
import ProfileTemplate from "../components/profile/ProfileTemplate";
import RequiredLoginTemplate from "../components/profile/RequiredLoginTemplate";

export default function ProfilePage() {
  const userToken = localStorage.getItem("token");
  return (
    <div className="flex h-full flex-col">
      <div className="w-full h-full">
        {userToken ? <ProfileTemplate /> : <RequiredLoginTemplate />}
      </div>
      <GNBBOX />
    </div>
  );
}
