import React from "react";
import { Link } from "react-router-dom";

export default function ReviewSection() {
  return (
    <>
      <Link
        className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
        to="/profile/reviews/writable"
      >
        작성 가능한 리뷰
      </Link>
      <Link
        className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
        to="/profile/reviews/collect"
      >
        리뷰 관리
      </Link>
    </>
  );
}
