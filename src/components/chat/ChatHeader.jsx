import React from "react";
import { Link } from "react-router-dom";
import BackButtonHeader from "../common/BackButtonHeader";

export default function ChatHeader({ counterName, chatId }) {
  return (
    <BackButtonHeader>
      <>
        <span className="text-sm pl-10 mr-auto">{counterName}</span>
        <span className="text-sm pr-[15px] text-blue-sunsu font-medium">
          <Link
            to={`/quotations/${chatId}?partnerName=${encodeURIComponent(
              counterName,
            )}`}
          >
            견적서 조회
          </Link>
        </span>
      </>
    </BackButtonHeader>
  );
}
