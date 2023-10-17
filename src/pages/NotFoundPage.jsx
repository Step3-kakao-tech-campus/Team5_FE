import React from "react";
import { Link } from "react-router-dom";
import GNBBOX from "../components/common/GNBBOX";

export default function NotFoundPage() {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full h-full flex flex-col tracking-tighter text-center gap-5">
        <h1 className=" font-semibold text-2xl pt-28">앗! 죄송해요.</h1>
        <p className="flex flex-col text-sm">
          <span>원하시는 페이지를 찾을 수 없어요.</span>
          <span>찾으시려는 페이지의 주소가 잘못 입력되었거나,</span>
          <span>
            페이지 주소가 변경 또는 삭제되어 더는 사용하실 수 없습니다.
          </span>
        </p>
        <p className="text-sm">
          입력하신 페이지의 주소가 정확한지 다시 한번 확인해주세요.
        </p>
        <div className=" flex justify-center gap-3 font-medium text-sm">
          <Link
            to="../"
            className=" w-28 bg-white text-black rounded-md py-2 px-4 border border-solid hover:bg-zinc-200"
          >
            이전으로
          </Link>
          <Link
            className="w-28 bg-blue-sunsu text-white rounded-md py-2 px-4 hover:bg-[#124b96]"
            to="/"
          >
            홈으로 가기
          </Link>
        </div>
      </div>

      <GNBBOX />
    </div>
  );
}
