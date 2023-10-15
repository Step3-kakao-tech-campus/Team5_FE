import Slider from "react-slick";
import SquarePhoto from "../common/atoms/SquarePhoto";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PortfolioCarousel.css";

const PortfolioCarousel = ({ portfolio }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // eslint-disable-next-line react/no-unstable-nested-components
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "custom-dots",
  };

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider {...settings}>
        {portfolio.images?.map((image, index) => (
          <SquarePhoto
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            src={image}
            alt={`${portfolio.plannerName} 플래너 소개 사진 - ${index + 1}번`}
            className="portfolio-image"
          />
        ))}
      </Slider>
    </>
  );
};

export default PortfolioCarousel;
