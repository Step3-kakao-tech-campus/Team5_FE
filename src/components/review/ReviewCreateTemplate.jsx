import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { createReview } from "../../apis/review";
import AutoHeightTextarea from "../common/atoms/AutoHeightTextarea";
import Button from "../common/atoms/Button";
import WarningBottomSheet from "../common/bottomsheet/WarningBottomSheet";
import ImageUploadZone from "../common/ImageUploadZone";

export default function ReviewCreateTemplate() {
  const { chatId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const partnerName = searchParams.get("partnerName");
  const [imageItems, setImageItems] = useState([]);
  const [stars, setStars] = useState(2.5);
  const heightRef = useRef(null);
  const contentRef = useRef(null);
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
      const response = await createReview({
        chatId,
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
    // url 접근 차단
    if (partnerName === null) {
      navigate("/404", { replace: true });
    }
  }, []);

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
        <WarningBottomSheet
          message="리뷰가 성공적으로 등록되었습니다."
          onClose={() => {
            setIsOpenSuccessBottomSheet(false);
            navigate("/profile");
          }}
        />
      )}
      <div className="w-full flex flex-col p-7 gap-[5px] " ref={heightRef}>
        <div className="w-full flex flex-col items-center justify-center h-[170px] ">
          <span className="text-2xl font-medium">{`${partnerName} 플래너님은 어땠나요?`}</span>
          <Rating
            value={stars}
            defaultValue={stars}
            precision={0.5}
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
        />
        <ImageUploadZone
          imageItems={imageItems}
          setImageItems={setImageItems}
        />
        <div className="grow flex flex-col justify-end pt-[10px]">
          <Button
            onClick={handleSubmit}
            className="block w-full h-[50px] rounded-[10px] font-normal text-sm bg-lightskyblue-sunsu"
          >
            {isSubmitting ? (
              <CircularProgress size={24} />
            ) : (
              <span>등록하기</span>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
