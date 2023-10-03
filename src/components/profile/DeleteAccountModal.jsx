import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../apis/user";
import { logOut } from "../../store/slices/userSlice";
import Modal from "../common/Modal";
import Button from "../signup/atoms/Button";

export default function DeleteAccountModal({ handler }) {
  const [agreePolicy, setAgreePolicy] = useState(false);
  const dispatch = useDispatch();

  const handleAgreement = (e) => {
    setAgreePolicy(e.target.checked);
  };

  const handleDeleteAccount = async () => {
    if (!agreePolicy) return;
    try {
      const response = await deleteAccount();
      console.log(response);
      if (response.success) {
        dispatch(logOut());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal handler={handler}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col tracking-tight font-bold text-lg ">
          <span>정말 회원탈퇴 하시겠습니까?</span>
          <span>모든 데이터는 복구가 불가능합니다.</span>
        </div>
        <div>
          <label
            htmlFor="policy"
            className="flex gap-1 items-center px-1 pt-10"
          >
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
          className={`block w-full h-[50px] mt-[10px] rounded-[10px] font-normal text-sm ${
            agreePolicy ? "bg-lightskyblue-sunsu" : "bg-zinc-300"
          }`}
          onClick={() => {
            handleDeleteAccount();
          }}
          disabled={!agreePolicy}
        >
          탈퇴하기
        </Button>
      </div>
    </Modal>
  );
}
