import React from "react";
import BackButtonHeader from "../common/BackButtonHeader";

export default function ChatHeader({ counterName }) {
  return (
    <BackButtonHeader>
      <span className=" text-xs pl-10">{counterName}</span>
    </BackButtonHeader>
  );
}
