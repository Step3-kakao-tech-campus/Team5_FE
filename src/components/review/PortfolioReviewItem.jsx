import React from "react";
import Slider from "react-slick";
import { ReactComponent as StarIcon } from "../../assets/star-02.svg";
import SquarePhoto from "../common/atoms/SquarePhoto";
import "./PortfolioReviewItem.css";

export default function PortfolioReviewItem({ review }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // eslint-disable-next-line react/no-unstable-nested-components
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    // eslint-disable-next-line react/no-unstable-nested-components
    customPaging(i) {
      return (
        <div className="relative after:pb-[100%] after:block">
          <img
            src={review.images[i]}
            className="absolute w-full h-full object-cover"
            alt={`${review.coupleName}님의 리뷰 썸네일 - ${i + 1}번`}
          />
        </div>
      );
    },
    dotsClass: "slick-dots",
    arrows: false,
  };

  return (
    <div className="w-full h-full flex flex-col gap-[5px] pb-5 border-b">
      {/* 이미지 영역 */}
      <div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Slider {...settings}>
          {review.images.map((image, index) => (
            <SquarePhoto
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              src={image}
              alt={`${review.coupleName}님의 리뷰 사진 - ${index + 1}번`}
              className=""
            />
          ))}
        </Slider>
      </div>
      {/* 별점 & 커플네임 */}
      <div className="flex justify-between mt-[110px] sm:mt-[80px] xs:mt-[70px] px-5">
        <div className="flex">
          {Array.from({ length: review.stars }).map(() => (
            <StarIcon className="w-[16px] h-[16px] mr-[1px]" />
          ))}
        </div>
        <span className="text-sm font-bold self-end">{review.coupleName}</span>
      </div>
      {/* 리뷰 content */}
      <p className="px-5">{review.content}</p>
    </div>
  );
}
