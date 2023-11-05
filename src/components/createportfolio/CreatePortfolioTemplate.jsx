import { CircularProgress } from "@mui/material";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createPortfolio, updatePortfolio } from "../../apis/portfolio";
import { comma } from "../../utils/convert";
import ImageUploadZone from "../common/ImageUploadZone";
import InputGroup from "../common/accounts/InputGroup";
import AutoHeightTextarea from "../common/atoms/AutoHeightTextarea";
import Button from "../common/atoms/Button";
import WarningBottomSheet from "../common/bottomsheet/WarningBottomSheet";
import ItemsInfo from "./ItemsInfo";
import SelectRegion from "./SelectRegion";
import Spinner from "../common/atoms/Spinner";

export default function CreatePortfolioTemplate({ data }) {
  const [isFirstSubmit, setIsFirstSubmit] = useState(data?.title === "");
  const [location, setLocation] = useState(data?.location);
  const [items, setItems] = useState([
    ...data.items.map((item) => {
      return {
        itemTitle: item.itemTitle,
        itemPrice: comma(item.itemPrice),
      };
    }),
  ]);
  const [numberItems, setNumberItems] = useState([
    ...data.items.map((item) => {
      return {
        itemTitle: item.itemTitle,
        itemPrice: Number(item.itemPrice),
      };
    }),
  ]);
  const [imageItems, setImageItems] = useState([...data.imageItems]);
  const [warningMessage, setWarningMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // login api 호출 중인지 아닌지 확인
  const [isOpenWarningBottomSheet, setIsOpenWarningBottomSheet] =
    useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const nameRef = useRef(null);
  const locationRef = useRef(null);
  const itemRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const careerRef = useRef(null);
  const partnerCompanyRef = useRef(null);

  const { mutate: createMutate } = useMutation(createPortfolio);
  const { mutate: updateMutate } = useMutation(updatePortfolio);
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    if (!nameRef.current?.value) {
      setWarningMessage("이름을 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      nameRef.current?.focus();
      return;
    }
    if (!location) {
      setWarningMessage("지역을 선택해주세요.");
      setIsOpenWarningBottomSheet(true);
      locationRef.current?.focus();
      return;
    }
    if (items.some((item) => !item.itemTitle)) {
      setWarningMessage("가격 항목을 모두 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      itemRef.current?.focus();
      return;
    }
    if (items.some((item) => !item.itemPrice)) {
      setWarningMessage("가격 항목을 모두 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      itemRef.current?.focus();
      return;
    }
    if (!titleRef.current?.value) {
      setWarningMessage("한 줄 소개를 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      titleRef.current?.focus();
      return;
    }
    if (!descriptionRef.current?.value) {
      setWarningMessage("소개를 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      descriptionRef.current?.focus();
      return;
    }
    if (!careerRef.current?.value) {
      setWarningMessage("경력을 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      careerRef.current?.focus();
      return;
    }
    if (!partnerCompanyRef.current?.value) {
      setWarningMessage("주요 제휴 업체를 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      partnerCompanyRef.current?.focus();
      return;
    }
    if (imageItems.length === 0) {
      setWarningMessage("포트폴리오 사진을 추가해주세요.");
      setIsOpenWarningBottomSheet(true);
      return;
    }
    const portfolioData = {
      plannerName: nameRef.current.value,
      location,
      numberItems,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      career: careerRef.current.value,
      partnerCompany: partnerCompanyRef.current.value,
      imageItems,
    };
    setIsSubmitting(true);
    if (isFirstSubmit) {
      createMutate(portfolioData, {
        onSuccess: () => {
          setIsSubmitting(false);
          setIsFirstSubmit(false);
          setWarningMessage("포트폴리오가 성공적으로 저장되었습니다.");
          queryClient.invalidateQueries("portfolios/self");
          setIsOpenWarningBottomSheet(true);
        },
        onError: (error) => {
          console.log(error);
          setIsSubmitting(false);
          setWarningMessage("포트폴리오를 저장하는데 실패했습니다.");
          setIsOpenWarningBottomSheet(true);
        },
      });
    } else {
      updateMutate(portfolioData, {
        onSuccess: () => {
          setIsSubmitting(false);
          setWarningMessage("포트폴리오가 성공적으로 수정되었습니다.");
          queryClient.invalidateQueries("portfolios/self");
          setIsOpenWarningBottomSheet(true);
        },
        onError: (error) => {
          console.log(error);
          setIsSubmitting(false);
          setWarningMessage("포트폴리오를 수정하는데 실패했습니다.");
          setIsOpenWarningBottomSheet(true);
        },
      });
    }
  };

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
          defaultValue={data?.plannerName}
        />
        {/* 지역 */}
        <SelectRegion
          location={location}
          setLocation={setLocation}
          ref={locationRef}
        />
        {/* 가격 */}
        <ItemsInfo
          items={items}
          ref={itemRef}
          setItems={setItems}
          numberItems={numberItems}
          setNumberItems={setNumberItems}
          setWarningMessage={setWarningMessage}
          setIsOpenWarningBottomSheet={setIsOpenWarningBottomSheet}
        />
        <AutoHeightTextarea
          label="한 줄 소개"
          ref={titleRef}
          id="title"
          name="title"
          maxLength={72}
          rows={2}
          defaultValue={data?.title}
        />
        <AutoHeightTextarea
          label="소개"
          ref={descriptionRef}
          id="description"
          name="description"
          rows={7}
          defaultValue={data?.description}
        />
        <AutoHeightTextarea
          label="경력"
          ref={careerRef}
          id="career"
          name="career"
          rows={3}
          defaultValue={data?.career}
        />
        <AutoHeightTextarea
          label="주요 제휴 업체"
          ref={partnerCompanyRef}
          id="partnerCompany"
          name="partnerCompany"
          rows={4}
          defaultValue={data?.partnerCompany}
        />
        {/* 사진 */}
        <ImageUploadZone
          imageItems={imageItems}
          setImageItems={setImageItems}
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
