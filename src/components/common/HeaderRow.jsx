import React from "react";

export default function HeaderRow({ children }) {
  return (
    <div className="header-row flex h-[50px] px-3 text-lg border-b border-lightgray-sunsu sticky top-0 z-10 bg-white">
      {children}
    </div>
  );
}
