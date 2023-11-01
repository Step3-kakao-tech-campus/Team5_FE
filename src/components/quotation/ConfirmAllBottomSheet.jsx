import React, { useState } from "react";
import { confirmQuotationAll } from "../../apis/quotation";
import BottomSheet from "../common/bottomsheet/BottomSheet";
import Button from "../common/atoms/Button";

const ConfirmAllBottomSheet = ({ onClose, chatId }) => {
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAgreement = () => {
    setAgreePolicy(!agreePolicy);
  };

  const handleConfirmAll = async () => {
    if (!agreePolicy) return;
    setIsSubmitting(true);
    try {
      const response = await confirmQuotationAll(chatId);
      console.log(response);
      if (response.success) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  return (
    <BottomSheet onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex flex-col tracking-tight font-bold text-lg pb-[42px]">
          <span>모든 결제가 완료되었나요?</span>
          <span>확정 후에는 취소가 불가능합니다.</span>
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
          onClick={handleConfirmAll}
          disabled={isSubmitting}
        >
          모든 결제 확정하기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default ConfirmAllBottomSheet;
