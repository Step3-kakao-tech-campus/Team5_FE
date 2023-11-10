import { CircularProgress } from "@mui/material";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { updatePortfolio } from "../../apis/portfolio";
import useOpenBottomSheet from "../../hooks/useOpenBottomSheet";
import { comma, uncomma } from "../../utils/convert";
import ImageUploadZone from "../common/ImageUploadZone";
import AutoHeightTextarea from "../common/atoms/AutoHeightTextarea";
import Button from "../common/atoms/Button";
import Spinner from "../common/atoms/Spinner";
import ItemsInfo from "./ItemsInfo";
import SelectRegion from "./SelectRegion";

// done test
export default function UpdatePortfolioTemplate({ portfolio }) {
  const { openBottomSheetHandler } = useOpenBottomSheet();
  const [location, setLocation] = useState(portfolio?.location);
  const [items, setItems] = useState([
    ...portfolio.items.map((item) => {
      return {
        itemTitle: item.itemTitle,
        itemPrice: comma(item.itemPrice),
      };
    }),
  ]);
  const [images, setImages] = useState([...portfolio.images]);
  const [isSubmitting, setIsSubmitting] = useState(false); // login api 호출 중인지 아닌지 확인
  const [isUploading, setIsUploading] = useState(false);

  const { userInfo } = useSelector((state) => state.user);
  const { mutate: updateMutate } = useMutation(updatePortfolio);
  const queryClient = useQueryClient();

  const locationRef = useRef(null);
  const itemRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const careerRef = useRef(null);
  const partnerCompanyRef = useRef(null);

  const openMessageBottomSheetAndFocus = (message, ref) => {
    openBottomSheetHandler({ bottomSheet: "messageBottomSheet", message });
    ref.current?.focus();
  };

  const handleSubmit = async () => {
    if (!location) {
      openMessageBottomSheetAndFocus("지역을 선택해주세요.", locationRef);
      return;
    }
    if (items.some((item) => !item.itemTitle)) {
      openMessageBottomSheetAndFocus("가격 항목을 모두 입력해주세요.", itemRef);
      return;
    }
    if (items.some((item) => item.itemPrice === "0" || !item.itemPrice)) {
      openMessageBottomSheetAndFocus("가격 항목을 모두 입력해주세요.", itemRef);
      return;
    }
    if (!titleRef.current?.value) {
      openMessageBottomSheetAndFocus("한 줄 소개를 입력해주세요.", titleRef);
      return;
    }
    if (!descriptionRef.current?.value) {
      openMessageBottomSheetAndFocus("소개를 입력해주세요.", descriptionRef);
      return;
    }
    if (!careerRef.current?.value) {
      openMessageBottomSheetAndFocus("경력을 입력해주세요.", careerRef);
      return;
    }
    if (!partnerCompanyRef.current?.value) {
      openMessageBottomSheetAndFocus(
        "주요 제휴 업체를 입력해주세요.",
        partnerCompanyRef,
      );
      return;
    }
    if (images.length === 0) {
      openBottomSheetHandler({
        bottomSheet: "messageBottomSheet",
        message: "포트폴리오 사진을 추가해주세요.",
      });
      return;
    }
    const portfolioData = {
      plannerName: userInfo.username,
      items: items.map((item) => {
        return {
          itemTitle: item.itemTitle,
          itemPrice: uncomma(item.itemPrice),
        };
      }),
      images,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      location,
      career: careerRef.current.value,
      partnerCompany: partnerCompanyRef.current.value,
    };
    console.log("portfolioData", portfolioData);
    setIsSubmitting(true);
    updateMutate(portfolioData, {
      onSuccess: () => {
        queryClient.invalidateQueries("portfolios/self");
        setIsSubmitting(false);
        openBottomSheetHandler({
          bottomSheet: "messageBottomSheet",
          message: "포트폴리오가 성공적으로 수정되었습니다.",
        });
      },
      onError: (error) => {
        // 디폴트 에러 핸들러를 적용하면 작성한게 사라지므로 따로 처리
        console.log(error);
        setIsSubmitting(false);
        openBottomSheetHandler({
          bottomSheet: "messageBottomSheet",
          message: "포트폴리오를 수정하는데 실패했습니다.",
        });
      },
    });
  };

  return (
    <>
      {isUploading && <Spinner />}
      <div className="w-full h-full flex flex-col p-7 gap-5">
        {/* 이름 */}
        <div>
          <div className=" pb-[5px] text-xs">이름</div>
          <input
            type="text"
            disabled
            defaultValue={userInfo.username}
            className="relative w-full h-[50px] rounded-[10px] px-[20px] py-[15px] border border-lightgray-sunsu text-sm"
          />
        </div>
        {/* 지역 */}
        <SelectRegion
          location={location}
          setLocation={setLocation}
          ref={locationRef}
        />
        {/* 가격 */}
        <ItemsInfo items={items} ref={itemRef} setItems={setItems} />
        <AutoHeightTextarea
          label="한 줄 소개"
          ref={titleRef}
          id="title"
          name="title"
          maxLength={72}
          rows={2}
          defaultValue={portfolio?.title}
        />
        <AutoHeightTextarea
          label="소개"
          ref={descriptionRef}
          id="description"
          name="description"
          rows={7}
          defaultValue={portfolio?.description}
        />
        <AutoHeightTextarea
          label="경력"
          ref={careerRef}
          id="career"
          name="career"
          rows={3}
          defaultValue={portfolio?.career}
        />
        <AutoHeightTextarea
          label="주요 제휴 업체"
          ref={partnerCompanyRef}
          id="partnerCompany"
          name="partnerCompany"
          rows={4}
          defaultValue={portfolio?.partnerCompany}
        />
        {/* 사진 */}
        <ImageUploadZone
          images={images}
          setImages={setImages}
          setIsUploading={setIsUploading}
        />
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex justify-center items-center w-full h-[50px] rounded-[10px] font-normal text-sm bg-lightskyblue-sunsu"
        >
          {isSubmitting ? (
            <CircularProgress size={24} />
          ) : (
            <span>저장하기</span>
          )}
        </Button>
      </div>
    </>
  );
}
