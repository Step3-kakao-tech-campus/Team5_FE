import React from "react";
import "./profileImageSpinner.css";
import cn from "classnames";

export default function profileImageSpinner({ className }) {
  return (
    <div className="absolute bottom-0 right-0 w-full h-full bg-black rounded-full opacity-60 cursor-pointer">
      <div
        className={cn("spinner spinner--steps2 icon-spinner-7", className)}
        aria-hidden="true"
      />
    </div>
  );
}
