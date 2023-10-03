import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentModal from "./PaymentModal";
import { logOut } from "../../store/slices/userSlice";

export default function ProfileTemplate() {
  const { userInfo } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="w-full h-full relative ">
      {modalOpen && <PaymentModal handler={() => setModalOpen(false)} />}
      <div className="w-full h-full relative p-16 flex flex-col gap-10">
        {/* 유저 정보 영역 */}
        <div className="flex flex-col pt-10">
          <span className=" font-normal text-3xl">안녕하세요</span>
          <span className=" font-medium text-3xl">{userInfo.username}님</span>
          <span className=" tracking-tighter pt-2">{userInfo.email}</span>
        </div>
        {/* 결제 영역 */}
        <div className="flex flex-col text-2xl gap-2">
          <span className="text-xl text-zinc-500">서비스</span>
          <button className=" w-fit" onClick={() => setModalOpen(true)}>
            순수 멤버십
          </button>
        </div>
        {/* 로그아웃 & 회원탈퇴 */}
        <div className="flex flex-col text-2xl gap-2">
          <span className="text-xl text-zinc-500">회원정보</span>
          <button
            className=" w-fit"
            onClick={() => {
              handleLogout();
            }}
          >
            로그아웃
          </button>
          <button className=" w-fit">회원탈퇴</button>
        </div>
      </div>
    </div>
  );
}
