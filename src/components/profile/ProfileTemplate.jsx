import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getUserInfo } from "../../apis/user";
import Modal from "../common/Modal";

export default function ProfileTemplate() {
  const { data, isLoading } = useQuery("/user/info", getUserInfo);
  const [modalOpen, setModalOpen] = useState(false);
  const userInfo = data?.response;
  useEffect(() => {
    console.log(data);
  }, [data]);
  const modalRef = useRef(null);
  console.log(modalRef.current);
  if (isLoading)
    return (
      <div className="flex justify-center h-1/5 items-center">
        <CircularProgress
          color="primary"
          style={{ width: "30px", height: "30px" }}
        />
      </div>
    );
  return (
    <div className="w-full h-full relative ">
      {modalOpen && (
        <Modal
          handler={() => {
            setModalOpen(false);
          }}
        />
      )}
      <div className="w-full h-full relative p-16 flex flex-col gap-10">
        {/* 유저 정보 영역 */}
        <div className="flex flex-col pt-10">
          <span className=" font-medium text-3xl">안녕하세요</span>
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
          <span>로그아웃</span>
          <span>회원탈퇴</span>
        </div>
      </div>
    </div>
  );
}
