import React from "react";
import useInterval from "../../../hooks/useInterval";

export default function Timer({ time, setTime }) {
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  useInterval(() => {
    if (time > 0) {
      setTime(time - 1);
    }
  }, 1000);

  return <div className="text-red-600 font-medium">{formatTime(time)}</div>;
}
