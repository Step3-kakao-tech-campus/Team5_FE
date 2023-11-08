import { CircularProgress } from "@mui/material";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { updatePortfolio } from "../../apis/portfolio";
import { comma, uncomma } from "../../utils/convert";
import { openMessageBottomSheet } from "../../utils/handleBottomSheet";
import ImageUploadZone from "../common/ImageUploadZone";
import InputGroup from "../common/accounts/InputGroup";
import AutoHeightTextarea from "../common/atoms/AutoHeightTextarea";
import Button from "../common/atoms/Button";
import Spinner from "../common/atoms/Spinner";
import ItemsInfo from "./ItemsInfo";
import SelectRegion from "./SelectRegion";

export default function UpdatePortfoliotemplate({ portfolio }) {
  const dispatch = useDispatch();
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

  const { mutate: updateMutate } = useMutation(updatePortfolio);
  const queryClient = useQueryClient();

  const nameRef = useRef(null);
  const locationRef = useRef(null);
  const itemRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const careerRef = useRef(null);
  const partnerCompanyRef = useRef(null);

  const openMessageBottomSheetAndFocus = (message, ref) => {
    openMessageBottomSheet(dispatch, message);
    ref.current?.focus();
  };

  const handleSubmit = async () => {
    console.log("items", items);
    if (!nameRef.current?.value) {
      openMessageBottomSheetAndFocus("이름을 입력해주세요.", nameRef);
      return;
    }
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
      openMessageBottomSheet(dispatch, "포트폴리오 사진을 추가해주세요.");
      return;
    }
    const portfolioData = {
      plannerName: nameRef.current.value,
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
        openMessageBottomSheet(
          dispatch,
          "포트폴리오가 성공적으로 수정되었습니다.",
        );
      },
      onError: (error) => {
        console.log(error);
        setIsSubmitting(false);
        openMessageBottomSheet(
          dispatch,
          "포트폴리오를 수정하는데 실패했습니다.",
        );
      },
    });
  };

  return (
    <>
      {isUploading && <Spinner />}
      <div className="w-full h-full flex flex-col p-7 gap-5">
        {/* 이름 */}
        <InputGroup
          id="plannerName"
          name="plannerName"
          type="text"
          placeholder="이름을 입력해주세요."
          label="이름"
          ref={nameRef}
          defaultValue={portfolio?.plannerName}
        />
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
