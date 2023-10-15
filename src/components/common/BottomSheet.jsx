import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function BottomSheet({ onClose, children }) {
  const modalRef = useRef(null);
  const modalWrapperRef = useRef(null);

  useOnClickOutside(modalRef, modalWrapperRef, onClose);

  return (
    <>
      <div
        ref={modalWrapperRef}
        className="modal_wrapper w-full max-w-[576px] h-full bg-black flex items-center justify-center fixed opacity-50 z-10"
      />
      <div
        ref={modalRef}
        className="fixed max-w-[576px] bottom-0 w-full z-10 mb-[50px]"
      >
        {/* 모달 상단 라운드 영역 */}
        <div className="bg-white w-full rounded-t-full h-8 flex flex-row-reverse">
          <button onClick={onClose}>
            <IoMdClose className=" m-6 text-xl" />
          </button>
        </div>
        {/* 모달 내용 */}
        <div className="bg-white px-[30px] pt-0.5 pb-[35px]">{children}</div>
      </div>
    </>
  );
}
