/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Photo from "../common/atoms/Photo";
import { ReactComponent as StarIcon } from "../../assets/star-02.svg";
import ReviewImageCarousel from "./ReviewImageCarousel";

export default function ReviewListTemplate({ reviews }) {
  return (
    <div className="w-full h-full py-2 flex flex-col gap-2">
      {reviews.map((review) => (
        <div className="w-full h-full" key={review.id}>
          <div className="h-full w-full border-b flex flex-col gap-2">
            <div className="flex justify-between px-5 pt-2 pb-1">
              <div className="font-bold text-lg">
                <span>{review.plannerName} 플래너</span>
              </div>
              <div className="flex items-center gap-1 self-start">
                <StarIcon className="w-[14px] h-[14px]" />
                <span>{review.stars}.0</span>
                <Link
                  to={`/profile/reviews/update/${review.id}`}
                  className="font-bold underline text-sm"
                >
                  리뷰로 이동
                </Link>
              </div>
            </div>
            <div>
              <ReviewImageCarousel review={review} />
            </div>
            <p className="flex justify-between mt-[110px] sm:mt-[80px] xs:mt-[70px] px-5 line-clamp-3 pb-5">
              {review.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
