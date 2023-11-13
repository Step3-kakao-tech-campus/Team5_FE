import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { deleteReview } from "../../apis/review";
import Button from "../common/atoms/Button";
import BottomSheet from "../common/bottomsheet/BottomSheet";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";

export default function DeleteReviewBottomSheet({ onClose }) {
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const { defaultErrorHandler } = useDefaultErrorHandler();

  const handleAgreement = () => {
    setAgreePolicy(!agreePolicy);
  };

  const handleDeleteReview = async () => {
    if (!agreePolicy) return;
    setIsSubmitting(true);
    try {
      const response = await deleteReview(parseInt(reviewId, 10));
      if (response.success) {
        navigate("/profile");
      }
    } catch (error) {
      onClose();
      defaultErrorHandler(error);
    }
    setIsSubmitting(false);
  };

  return (
    <BottomSheet onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex flex-col tracking-tight font-bold text-lg pb-[42px]">
          <span>정말 리뷰를 삭제하시겠습니까?</span>
          <span>삭제 후에는 복구가 불가능합니다.</span>
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
          onClick={handleDeleteReview}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} />
          ) : (
            <span>삭제하기</span>
          )}
        </Button>
      </div>
    </BottomSheet>
  );
}
