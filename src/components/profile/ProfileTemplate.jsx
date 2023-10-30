import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { logOut } from "../../store/slices/userSlice";
import PaymentBottomSheet from "../common/bottomsheet/PaymentBottomSheet";
import DeleteAccountBottomSheet from "./DeleteAccountBottomSheet";
import MembershipBottomSheet from "./MembershipBottomSheet";
import ProfileImage from "./ProfileImage";

export default function ProfileTemplate() {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [paymentBottomSheetOpen, setPaymentBottomSheetOpen] = useState(false);
  const [membershipBottomSheetOpen, setMembershipBottomSheetOpen] =
    useState(false);
  const [deleteAccountBottomSheetOpen, setDeleteAccountBottomSheetOpen] =
    useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  const handleOnShowPaymentBottomSheet = () => {
    if (userInfo.grade === "premium") {
      setMembershipBottomSheetOpen(true);
      return;
    }
    setPaymentBottomSheetOpen(true);
  };

  return (
    <div className="relative w-full h-full ">
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
        <div className="flex pt-[50px] justify-between pr-[50px] pb-[25px]">
          <div className="flex flex-col ">
            <span className="text-xl">안녕하세요</span>
            <span className="text-xl">
              <span className="font-bold text-blue-sunsu">
                {userInfo.username}
              </span>
              님
            </span>
            <span className="pt-[5px] text-xs tracking-tight">
              {userInfo.email}
            </span>
          </div>
          <ProfileImage />
        </div>
        {/* 결제 영역 */}
        <div className="flex flex-col text-base pt-[15px]">
          <span className="pb-[5px] text-skyblue-sunsu">서비스</span>
          {userInfo.role === "planner" ? (
            <>
              <Link
                className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
                to="/profile/create/portfolio"
              >
                포트폴리오 등록 / 수정
              </Link>
              <button className="w-fit pt-[5px] pb-[5px] text-lg hover:underline">
                포트폴리오 삭제
              </button>
            </>
          ) : (
            <>
              <Link
                className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
                to="/"
              >
                리뷰 작성 / 수정
              </Link>
              <button className="w-fit pt-[5px] pb-[5px] text-lg hover:underline">
                리뷰 삭제
              </button>
            </>
          )}
          <Link
            className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
            to="/"
          >
            견적서 모아보기
          </Link>
          <button
            className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
            onClick={handleOnShowPaymentBottomSheet}
          >
            순수 멤버십
          </button>
        </div>
        {/* 로그아웃 & 회원탈퇴 */}
        <div className="flex flex-col text-base pt-[15px] pb-[10px]">
          <span className="pb-[5px] text-skyblue-sunsu">회원정보</span>
          <button
            className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
            onClick={handleLogout}
          >
            로그아웃
          </button>
          <button
            className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
            onClick={() => setDeleteAccountBottomSheetOpen(true)}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
