import Slider from "react-slick";
import SquarePhoto from "../common/atoms/SquarePhoto";
import "./ReviewImageCarousel.css";

const ReviewImageCarousel = ({ review }) => {
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
    lazyLoad: "anticipated",
  };

  return (
    <>
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
    </>
  );
};

export default ReviewImageCarousel;
