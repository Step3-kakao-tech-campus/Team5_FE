import React from "react";
import CreatePortfolioHeader from "./CreatePortfolioHeader";

export default function CreatePortfolioTemplate() {
  // 리액트 쿼리 쓰는게 나음
  return (
    <div className="w-full h-full">
      <CreatePortfolioHeader />
      {/* 컨텐츠 영역 */}
      <div>포트폴리오 등록 / 수정</div>
    </div>
  );
}
