import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Button from "../signup/atoms/Button";

export default function Modal({ handler }) {
  const modalRef = useRef(null);
  const modalWrapperRef = useRef(null);

  useOnClickOutside(modalRef, modalWrapperRef, handler);

  return (
    <>
      <div
        ref={modalWrapperRef}
        className="modal_wrapper w-full h-full bg-black flex items-center justify-center absolute opacity-30 z-10"
      />
      <div ref={modalRef} className="absolute bottom-0 w-full z-10">
        {/* 모달 상단 라운드 영역 */}
        <div className="bg-white w-full rounded-t-full h-8" />
        {/* 모달 내용 */}
        <div className="bg-white px-10 pt-5 pb-10">
          <div className="flex flex-col tracking-tight font-bold text-lg">
            <span>한 번만 결제하면</span>
            <span>모든 웨딩플래너의 매칭 내역 열람 가능</span>
          </div>
          <div>
            <span className="text-xs text-zinc-500">
              단, 예비 신랑신부 회원은 결혼 과정이 끝나는 시점에 멤버십이 자동
              해지됩니다.
            </span>
          </div>
          <div className="py-5 text-xl">
            <span className="font-bold">6,900원</span>
            <span>에 순수 멤버십을 이용해보세요.</span>
          </div>
          <Button className="block w-full h-[50px] mt-[10px] rounded-[10px] font-normal text-sm bg-lightskyblue-sunsu">
            결제하기
          </Button>
        </div>
      </div>
    </>
  );
}
