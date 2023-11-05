import React from "react";
import { ReactComponent as StarIcon } from "../../assets/star-02.svg";

export default function PortfolioReviewItem({ review }) {
  return (
    <div className="w-full h-full flex flex-col gap-3 border-b-2 pb-5">
      {/* 이미지 영역 */}
      <div className="flex">
        {review.images.map((image, idx) => (
          <img
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            src={image}
            alt="결혼 사진"
            className="w-[100px] h-[100px] object-cover xs:w-[80px] xs:h-[80px]"
          />
        ))}
      </div>
      {/* 별점 & 커플네임 */}
      <div className="flex justify-between">
        <div className="flex">
          {Array.from({ length: review.stars }).map(() => (
            <StarIcon className="w-[20px] h-[20px] mr-[1px]" />
          ))}
        </div>
        <span className="text-sm font-bold self-end">{review.coupleName}</span>
      </div>
      {/* 리뷰 content */}
      <p>{review.content}</p>
    </div>
  );
}
