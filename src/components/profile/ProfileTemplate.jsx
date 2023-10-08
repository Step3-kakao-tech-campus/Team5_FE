import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/slices/userSlice";
import DeleteAccountBottomSheet from "./DeleteAccountBottomSheet";
import PaymentBottomSheet from "./PaymentBottomSheet";
import MembershipBottomSheet from "./MembershipBottomSheet";

export default function ProfileTemplate() {
  const { userInfo } = useSelector((state) => state.user);
  const [paymentBottomSheetOpen, setPaymentBottomSheetOpen] = useState(false);
  const [membershipBottomSheetOpen, setMembershipBottomSheetOpen] =
    useState(false);
  useState(false);
  const [deleteAccountBottomSheetOpen, setDeleteAccountBottomSheetOpen] =
    useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="w-full h-full relative ">
      {paymentBottomSheetOpen && (
        <PaymentBottomSheet handler={() => setPaymentBottomSheetOpen(false)} />
      )}
      {membershipBottomSheetOpen && (
        <MembershipBottomSheet
          handler={() => setMembershipBottomSheetOpen(false)}
        />
      )}
      {deleteAccountBottomSheetOpen && (
        <DeleteAccountBottomSheet
          handler={() => setDeleteAccountBottomSheetOpen(false)}
        />
      )}
      <div className="w-full h-full relative p-16 flex flex-col gap-10">
        {/* 유저 정보 영역 */}
        <div className="flex flex-col pt-10">
          <span className=" font-normal text-3xl">안녕하세요</span>
          <span className=" font-normal text-2xl">{userInfo.username}님</span>
          <span className=" tracking-tighter pt-2">{userInfo.email}</span>
        </div>
        {/* 결제 영역 */}
        <div className="flex flex-col text-2xl gap-2">
          <span className="text-xl text-zinc-500">서비스</span>
          <button
            className=" w-fit"
            onClick={() => {
              if (userInfo.grade === "premium") {
                setMembershipBottomSheetOpen(true);
                return;
              }
              setPaymentBottomSheetOpen(true);
            }}
          >
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
          <button
            className=" w-fit"
            onClick={() => setDeleteAccountBottomSheetOpen(true)}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
