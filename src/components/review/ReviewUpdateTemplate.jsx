import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { updateReview } from "../../apis/review";
import ImageUploadZone from "../common/ImageUploadZone";
import AutoHeightTextarea from "../common/atoms/AutoHeightTextarea";
import Button from "../common/atoms/Button";
import SuccessBottomSheet from "../common/bottomsheet/SuccessBottomSheet";
import WarningBottomSheet from "../common/bottomsheet/WarningBottomSheet";

export default function ReviewUpdateTemplate({ review }) {
  // eslint-disable-next-line prefer-destructuring
  const plannerName = review.plannerName;
  const [stars, setStars] = useState(review.stars);
  const [imageItems, setImageItems] = useState(review.images);
  const contentRef = useRef(review.content);
  const heightRef = useRef(null);
  const [isOpenWarningBottomSheet, setIsOpenWarningBottomSheet] =
    useState(false);
  const [isOpenSuccessBottomSheet, setIsOpenSuccessBottomSheet] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // login api 호출 중인지 아닌지 확인
  const [warningMessage, setWarningMessage] = useState("");

  const handleSubmit = async () => {
    if (stars === null) {
      setWarningMessage("별점을 입력해주세요.");
      setIsOpenWarningBottomSheet(true);

      return;
    }
    if (contentRef.current.value === "") {
      setWarningMessage("리뷰 내용을 입력해주세요.");
      setIsOpenWarningBottomSheet(true);

      return;
    }
    if (imageItems.length === 0) {
      setWarningMessage("사진을 등록해주세요.");
      setIsOpenWarningBottomSheet(true);

      return;
    }
    setIsSubmitting(true);
    try {
      const response = await updateReview({
        reviewId: review.id,
        content: contentRef.current.value,
        stars,
        imageItems,
      });
      if (response.success) {
        setIsOpenSuccessBottomSheet(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    const height = heightRef?.current?.offsetHeight;
    if (height < window.innerHeight - 100) {
      heightRef.current.style.height = "calc(100vh - 100px)";
    } else {
      heightRef.current.style.height = "auto";
    }
  }, [imageItems]);

  return (
    <>
      {isOpenWarningBottomSheet && (
        <WarningBottomSheet
          message={warningMessage}
          onClose={() => {
            setIsOpenWarningBottomSheet(false);
          }}
        />
      )}
      {isOpenSuccessBottomSheet && (
        <SuccessBottomSheet
          message="리뷰가 성공적으로 수정되었습니다."
          onClose={() => {
            setIsOpenSuccessBottomSheet(false);
          }}
        />
      )}
      <div className="w-full flex flex-col p-7 gap-[5px] " ref={heightRef}>
        <div className="w-full flex flex-col items-center justify-center h-[170px] ">
          <span className="text-2xl font-medium">{`${plannerName} 플래너님은 어땠나요?`}</span>
          <Rating
            value={stars}
            defaultValue={stars}
            precision={1}
            getLabelText={(value) => `${value} Star${value !== 1 ? "s" : ""}`}
            onChange={(event, newValue) => {
              setStars(newValue);
            }}
            size="large"
            sx={{
              fontSize: "50px",
            }}
          />
        </div>
        <AutoHeightTextarea
          label="내용을 작성해주세요."
          id="content"
          name="content"
          ref={contentRef}
          rows={7}
          defaultValue={review.content}
        />
        <ImageUploadZone
          imageItems={imageItems}
          setImageItems={setImageItems}
        />
        <div className="grow flex flex-col justify-end pt-[10px]">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-[50px] rounded-[10px] font-normal text-sm bg-lightskyblue-sunsu flex justify-center items-center"
          >
            {isSubmitting ? (
              <CircularProgress size={24} />
            ) : (
              <span>수정하기</span>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
