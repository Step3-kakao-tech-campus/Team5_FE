import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { deleteQuotation } from "../../apis/quotation";
import Button from "../common/atoms/Button";
import BottomSheet from "../common/bottomsheet/BottomSheet";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";

const DeleteOneBottomSheet = ({ onClose, quotationId }) => {
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: deleteQuotationMutate } = useMutation(deleteQuotation);
  const queryClient = useQueryClient();
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const { chatId } = useParams();

  const handleAgreement = () => {
    setAgreePolicy(!agreePolicy);
  };

  const handleConfirmOne = async () => {
    if (!agreePolicy) return;
    setIsSubmitting(true);
    deleteQuotationMutate(quotationId, {
      onSuccess: () => {
        queryClient.invalidateQueries(`/quotations?chatId=${chatId}`);
        setIsSubmitting(false);
        onClose();
      },
      onError: (error) => {
        onClose();
        defaultErrorHandler(error);
        setIsSubmitting(false);
      },
    });
  };

  return (
    <BottomSheet onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex flex-col tracking-tight font-bold text-lg pb-[42px]">
          <span>정말 삭제하시겠습니까?</span>
          <span>삭제 후에는 취소가 불가능합니다.</span>
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
          onClick={handleConfirmOne}
          disabled={isSubmitting}
        >
          삭제하기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default DeleteOneBottomSheet;
