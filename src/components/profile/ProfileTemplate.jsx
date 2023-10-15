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
  const [deleteAccountBottomSheetOpen, setDeleteAccountBottomSheetOpen] =
    useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleOnShowPaymentBottomSheet = () => {
    if (userInfo.grade === "premium") {
      setMembershipBottomSheetOpen(true);
      return;
    }
    setPaymentBottomSheetOpen(true);
  };

  return (
    <div className="w-full h-full relative ">
      {paymentBottomSheetOpen && (
        <PaymentBottomSheet onClose={() => setPaymentBottomSheetOpen(false)} />
      )}
      {membershipBottomSheetOpen && (
        <MembershipBottomSheet
          onClose={() => setMembershipBottomSheetOpen(false)}
        />
      )}
      {deleteAccountBottomSheetOpen && (
        <DeleteAccountBottomSheet
          onClose={() => setDeleteAccountBottomSheetOpen(false)}
        />
      )}
      <div className="flex flex-col w-full h-full relative pl-[35px]">
        {/* 유저 정보 영역 */}
        <div className="flex flex-col py-[50px]">
          <span className=" text-xl">안녕하세요</span>
          <span className=" text-xl">
            <span className="font-bold text-blue-sunsu">
              {userInfo.username}
            </span>
            님
          </span>
          <span className=" pt-[5px] text-xs tracking-tight">
            {userInfo.email}
          </span>
        </div>
        {/* 결제 영역 */}
        <div className="flex flex-col text-base pt-[15px]">
          <span className="pb-[5px] text-lg text-skyblue-sunsu font-bold">
            서비스
          </span>
          <button
            className=" w-fit pt-[5px] pb-[10px]"
            onClick={handleOnShowPaymentBottomSheet}
          >
            순수 멤버십
          </button>
        </div>
        {/* 로그아웃 & 회원탈퇴 */}
        <div className="flex flex-col text-base pt-[15px] pb-[10px]">
          <span className="pb-[5px] text-lg text-skyblue-sunsu font-bold">
            회원정보
          </span>
          <button className=" w-fit pt-[5px] pb-[10px]" onClick={handleLogout}>
            로그아웃
          </button>
          <button
            className=" w-fit pt-[5px] pb-[10px]"
            onClick={() => setDeleteAccountBottomSheetOpen(true)}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
