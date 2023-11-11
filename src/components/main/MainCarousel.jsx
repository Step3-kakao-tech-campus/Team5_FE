import Slider from "react-slick";
import MainPhoto from "./MainPhoto";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MainCarousel.css";

const MainCarousel = () => {
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
    arrows: false,
    lazyLoad: "anticipated",
  };

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider {...settings}>
        <MainPhoto
          to="portfolios/1"
          src="images/1_1.png"
          alt="유희정 플래너 메인 사진"
          className="portfolio-image"
          plannerName="유희정 플래너"
          brideName="김연아 신부님"
          brideInstagram="@yunakim"
        />
        <MainPhoto
          to="portfolios/2"
          src="images/2_1.png"
          alt="김아름 플래너 메인 사진"
          className="portfolio-image"
          plannerName="김아름 플래너"
          brideName="박신혜 신부님"
          brideInstagram="@ssinz7"
        />
      </Slider>
    </>
  );
};

export default MainCarousel;
