import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function Modal({ handler, children }) {
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
        <div className="bg-white w-full rounded-t-full h-8 flex flex-row-reverse">
          <button onClick={handler}>
            <IoMdClose className=" m-6 text-xl" />
          </button>
        </div>
        {/* 모달 내용 */}
        <div className="bg-white px-10 pt-5 pb-10">{children}</div>
      </div>
    </>
  );
}
