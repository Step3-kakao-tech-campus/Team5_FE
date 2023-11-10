import React from "react";
import { Link } from "react-router-dom";

export default function PortfolioSection({
  setDeletePortfolioBottomSheetOpen,
}) {
  return (
    <>
      <Link
        className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
        to="/profile/create/portfolio"
      >
        포트폴리오 등록 / 수정
      </Link>
      <button
        className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
        onClick={() => setDeletePortfolioBottomSheetOpen(true)}
      >
        포트폴리오 삭제
      </button>
    </>
  );
}
