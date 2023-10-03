import React from "react";
import GNBBOX from "../components/common/GNBBOX";
import ProfileTemplate from "../components/profile/ProfileTemplate";

export default function ProfilePage() {
  return (
    <div className="flex h-full flex-col">
      <div className="w-full h-full">
        <ProfileTemplate />
      </div>
      <GNBBOX />
    </div>
  );
}
