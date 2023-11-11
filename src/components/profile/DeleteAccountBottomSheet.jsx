import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../../apis/user";
import useOpenBottomSheet from "../../hooks/useOpenBottomSheet";
import { logOut } from "../../store/slices/userSlice";
import { deleteUserData } from "../../utils/firebase";
import Button from "../common/atoms/Button";
import BottomSheet from "../common/bottomsheet/BottomSheet";

// test 완료
export default function DeleteAccountBottomSheet({ onClose }) {
  const { userInfo } = useSelector((state) => state.user);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { openBottomSheetHandler } = useOpenBottomSheet();

  const handleAgreement = () => {
    setAgreePolicy(!agreePolicy);
  };

  const handleDeleteAccount = async () => {
    if (!agreePolicy) return;
    setIsSubmitting(true);
    try {
      const response = await deleteAccount();
      console.log(response);
      if (response.success) {
        deleteUserData(userInfo.userId);
        dispatch(logOut());
      }
    } catch (error) {
      console.log(error);
      if (error?.response.status === 500) {
        onClose();
        openBottomSheetHandler({ bottomSheet: "serverErrorBottomSheet" });
      }
    }
    setIsSubmitting(false);
  };

  return (
    <BottomSheet onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex flex-col tracking-tight font-bold text-lg pb-[42px]">
          <span>정말 회원탈퇴 하시겠습니까?</span>
          <span>모든 데이터는 복구가 불가능합니다.</span>
        </div>
        <div className="pb-[15px]">
          <label htmlFor="policy" className="flex gap-1 items-center px-1">
            <input
              type="checkbox"
              id="policy"
              name="policy-agree"
              checked={agreePolicy}
              onChange={handleAgreement}
              className="w-[14px] h-[14px] rounded-[4px] border-lightgray-sunsu cursor-pointer accent-blue-sunsu"
            />
            <span className="text-xs">
              안내사항을 확인하였으며, 이에 동의합니다.
            </span>
          </label>
        </div>
        <Button
          className={`block w-full h-[50px] rounded-[10px] text-sm ${
            agreePolicy ? "bg-lightskyblue-sunsu" : "bg-zinc-300"
          }`}
          onClick={handleDeleteAccount}
          disabled={isSubmitting}
        >
          탈퇴하기
        </Button>
      </div>
    </BottomSheet>
  );
}
