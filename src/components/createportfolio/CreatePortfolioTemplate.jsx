import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createPortfolio, updatePortfolio } from "../../apis/portfolio";
import useInput from "../../hooks/useInput";
import { comma } from "../../utils/convert";
import TextareaGroup from "../common/TextareaGroup";
import InputGroup from "../common/accounts/InputGroup";
import Button from "../common/atoms/Button";
import ItemsInfo from "./ItemsInfo";
import PortfolioImage from "./PortfolioImage";
import SelectRegion from "./SelectRegion";
import WarningBottomSheet from "./WarningBottomSheet";

export default function CreatePortfolioTemplate({ data }) {
  const [isFirstSubmit, setIsFirstSubmit] = useState(data?.title === "");
  const { handleChange, values } = useInput({
    plannerName: data?.plannerName,
    title: data?.title,
    description: data?.description,
    career: data?.career,
    partnerCompany: data?.partnerCompany,
  });
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
    setIsSubmitting(true);
    if (!values.plannerName) {
      setWarningMessage("이름을 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      setIsSubmitting(false);
      nameRef.current?.focus();
      return;
    }
    if (!location) {
      setWarningMessage("지역을 선택해주세요.");
      setIsOpenWarningBottomSheet(true);
      setIsSubmitting(false);
      locationRef.current?.focus();
      return;
    }
    if (items.some((item) => !item.itemTitle)) {
      setWarningMessage("가격 항목을 모두 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      setIsSubmitting(false);
      itemRef.current?.focus();
      return;
    }
    if (items.some((item) => !item.itemPrice)) {
      setWarningMessage("가격 항목을 모두 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      setIsSubmitting(false);
      itemRef.current?.focus();
      return;
    }
    if (!values.title) {
      setWarningMessage("한 줄 소개를 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      setIsSubmitting(false);
      titleRef.current?.focus();
      return;
    }
    if (!values.description) {
      setWarningMessage("소개를 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      setIsSubmitting(false);
      descriptionRef.current?.focus();
      return;
    }
    if (!values.career) {
      setWarningMessage("경력을 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      setIsSubmitting(false);
      careerRef.current?.focus();
      return;
    }
    if (!values.partnerCompany) {
      setWarningMessage("주요 제휴 업체를 입력해주세요.");
      setIsOpenWarningBottomSheet(true);
      setIsSubmitting(false);
      partnerCompanyRef.current?.focus();
      return;
    }
    if (imageItems.length === 0) {
      setWarningMessage("포트폴리오 사진을 추가해주세요.");
      setIsOpenWarningBottomSheet(true);
      setIsSubmitting(false);
      return;
    }
    const portfolioData = {
      plannerName: values.plannerName,
      location,
      numberItems,
      title: values.title,
      description: values.description,
      career: values.career,
      partnerCompany: values.partnerCompany,
      imageItems,
    };
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
      <div className="w-full h-full flex flex-col p-7 gap-5">
        {/* 이름 */}
        <InputGroup
          id="plannerName"
          name="plannerName"
          type="text"
          value={values.plannerName}
          placeholder="이름을 입력해주세요."
          label="이름"
          ref={nameRef}
          onChange={handleChange}
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
        <TextareaGroup
          label="한 줄 소개"
          ref={titleRef}
          id="title"
          name="title"
          value={values?.title}
          onChange={handleChange}
          rows={3}
          maxLength={120}
        />
        <TextareaGroup
          label="소개"
          ref={descriptionRef}
          id="description"
          name="description"
          value={values?.description}
          onChange={handleChange}
          rows={8}
        />
        <TextareaGroup
          label="경력"
          ref={careerRef}
          id="career"
          name="career"
          value={values?.career}
          onChange={handleChange}
          rows={3}
        />
        <TextareaGroup
          label="주요 제휴 업체"
          ref={partnerCompanyRef}
          id="partnerCompany"
          name="partnerCompany"
          value={values?.partnerCompany}
          onChange={handleChange}
          rows={3}
        />
        {/* 사진 */}
        <PortfolioImage imageItems={imageItems} setImageItems={setImageItems} />
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="block w-full h-[50px] rounded-[10px] font-normal text-sm bg-lightskyblue-sunsu"
        >
          저장하기
        </Button>
      </div>
    </>
  );
}
