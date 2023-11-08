import MainBestReviewItem from "./MainBestReviewItem";

const MainBestReview = () => {
  return (
    <div>
      <div className="ml-[12px] mt-[15px] text-lg font-semibold">
        BEST REVIEW
      </div>
      <MainBestReviewItem
        className="border-b border-lightgray-sunsu"
        src="images/2.jpg"
        alt="김하나님의 리뷰 사진"
        plannerName="유희정"
        coupleName="김하나"
        content="봄이 지나고 별이 버리었습니다. 오는 하나에 옥 있습니다. 둘 슬퍼하는
            무엇인지 아스라히 토끼, 강아지, 봅니다. 하나에 없이 나는 청춘이
            피어나듯이 버리었습니다. 봄이 지나고 별이 버리었습니다. 오는 하나에
            옥 있습니다. 둘 슬퍼하는 무엇인지 아스라히 토끼, 강아지, 봅니다.
            하나에 없이 나는 청춘이 피어나듯이 버리었습니다."
        reviewId={1}
      />
      <MainBestReviewItem
        src="images/3.jpg"
        alt="백도희님의 리뷰 사진"
        plannerName="김아름"
        coupleName="백도희"
        content="봄이 지나고 별이 버리었습니다. 오는 하나에 옥 있습니다. 둘 슬퍼하는
            무엇인지 아스라히 토끼, 강아지, 봅니다. 하나에 없이 나는 청춘이
            피어나듯이 버리었습니다. 봄이 지나고 별이 버리었습니다. 오는 하나에
            옥 있습니다. 둘 슬퍼하는 무엇인지 아스라히 토끼, 강아지, 봅니다.
            하나에 없이 나는 청춘이 피어나듯이 버리었습니다."
        reviewId={2}
      />
    </div>
  );
};

export default MainBestReview;
