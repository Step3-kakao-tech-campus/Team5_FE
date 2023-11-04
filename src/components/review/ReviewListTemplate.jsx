/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Photo from "../common/atoms/Photo";

export default function ReviewListTemplate({ reviews }) {
  return (
    <div className="w-full h-full py-2 px-4 flex flex-col gap-2">
      {reviews.map((review) => (
        <div className="w-full h-full" key={review.id}>
          <div className="h-full w-full border-b p-3 flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="font-bold text-lg">
                <span>{review.plannerName} 플래너</span>
              </div>
              <div className="flex items-center gap-1 self-start">
                <img
                  src="/images/star.png"
                  alt="별점"
                  className="w-[14px] h-[14px]"
                />
                <span>{review.stars}.0</span>
                <Link
                  to={`/profile/reviews/update/${review.id}`}
                  className="font-bold underline text-sm"
                >
                  리뷰로 이동
                </Link>
              </div>
            </div>
            <div className="grid w-full h-full grid-cols-3 gap-2">
              {review.images.map((image, idx) => (
                <div
                  className="relative w-full h-0"
                  style={{ paddingBottom: "100%" }}
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                >
                  <Photo
                    src={image}
                    alt="결혼 사진"
                    className="absolute w-full h-full object-cover object-center rounded-[10px]"
                  />
                </div>
              ))}
            </div>
            <p className=" line-clamp-3 p-1">{review.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
