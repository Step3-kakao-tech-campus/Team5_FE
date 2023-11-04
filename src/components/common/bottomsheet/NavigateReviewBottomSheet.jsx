import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import BottomSheet from "./BottomSheet";

export default function NavigateReviewBottomSheet({ onClose }) {
  const { userInfo } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const { chatId } = useParams();
  const plannerName = searchParams.get("plannerName");

  return (
    <BottomSheet onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex flex-col tracking-tight font-bold text-lg pb-[42px]">
          <span>확정이 완료되었어요.</span>
          <span>{`${userInfo.username}님의 소중한 후기를 들려주세요.`}</span>
        </div>
        <Link
          className=" w-full h-[50px] rounded-[10px] text-sm bg-lightskyblue-sunsu flex justify-center items-center"
          to={`/profile/reviews/create/${chatId}?plannerName=${encodeURIComponent(
            plannerName,
          )}`}
        >
          리뷰 작성하기
        </Link>
      </div>
    </BottomSheet>
  );
}
