import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";

export default function EmptySearchResult() {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="pt-10 flex flex-col items-center gap-5">
        <BsExclamationTriangle size={50} />
        <div className="flex flex-col items-center">
          <span className=" text-2xl font-bold">검색 결과가 없습니다.</span>
          <span>검색어나 카테고리 설정을 변경해보세요.</span>
        </div>
      </div>
    </div>
  );
}
