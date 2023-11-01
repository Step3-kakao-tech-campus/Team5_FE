import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useAtomValue } from "jotai";
import useInput from "../hooks/useInput";
import { updateQuotation } from "../apis/quotation";
import QuotationUpdateHeader from "../components/quotation/QuotationUpdateHeader";
import Box from "../components/common/atoms/Box";
import InputGroup from "../components/common/accounts/InputGroup";
import Label from "../components/common/atoms/Label";
import AlertBox from "../components/common/accounts/AlertBox";
import Button from "../components/common/atoms/Button";
import { quotationItemAtom } from "../store";
import AutoHeightTextarea from "../components/common/atoms/AutoHeightTextarea";
import { convertPriceFormat, uncomma } from "../utils/convert";

const QuotationUpdatePage = () => {
  const navigate = useNavigate();
  const { quotationId } = useParams();
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const quotationItem = useAtomValue(quotationItemAtom);
  const [price, setPrice] = useState(convertPriceFormat(quotationItem.price));
  const titleInputRef = useRef(null);
  const companyInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const priceInputRef = useRef(null);

  const { values, handleChange } = useInput({
    title: quotationItem.title,
    company: quotationItem.company,
    description: quotationItem.description,
  });

  const validateInput = () => {
    if (!values.title) {
      setErrorMessage("항목을 입력해주세요.");
      titleInputRef.current.focus();
      setIsSubmitting(false);
      return false;
    }
    if (!values.company) {
      setErrorMessage("업체를 입력해주세요.");
      companyInputRef.current.focus();
      setIsSubmitting(false);
      return false;
    }
    if (!values.description) {
      setErrorMessage("상세 설명을 입력해주세요.");
      descriptionInputRef.current.focus();
      setIsSubmitting(false);
      return false;
    }
    if (!price) {
      setErrorMessage("가격을 입력해주세요.");
      priceInputRef.current.focus();
      setIsSubmitting(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput()) return;
    try {
      setIsSubmitting(true);
      const res = await updateQuotation(quotationId, chatId, {
        title: values.title,
        company: values.company,
        description: values.description,
        price: uncomma(price),
      });
      if (res.success) {
        navigate(`/quotations/${chatId}`);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  return (
    <div className="flex w-full h-full flex-col">
      <QuotationUpdateHeader />
      <Box className="relative h-full px-[29px] pt-[30px] text-xs justify-center">
        <form>
          <InputGroup
            ref={titleInputRef}
            id="title"
            type="text"
            name="title"
            label="항목"
            placeholder="항목"
            value={values.title}
            onChange={handleChange}
            className="relative"
          />
          <InputGroup
            ref={companyInputRef}
            id="company"
            type="text"
            name="company"
            label="업체"
            placeholder="업체"
            value={values.company}
            onChange={handleChange}
            className="relative pt-[15px]"
          />

          <Box className="relative pt-[15px]">
            <div className="pb-[5px]">
              <Label htmlFor="description" className="text-xs">
                상세 설명
              </Label>
            </div>
            <AutoHeightTextarea
              ref={descriptionInputRef}
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="민감한 정보는 작성하지 않도록 유의해주세요"
              className="relative w-full h-[70px] rounded-[10px] px-[20px] py-[15px] border border-lightgray-sunsu text-sm bg-transparent overflow-hidden resize-none"
            />
          </Box>

          <Box className="relative pt-[15px]">
            <div className="pb-[5px]">
              <Label htmlFor="price" className="text-xs">
                가격
              </Label>
            </div>
            <div className="flex items-center">
              <input
                ref={priceInputRef}
                id="price"
                name="price"
                type="text"
                value={price}
                onChange={() =>
                  setPrice(convertPriceFormat(priceInputRef.current.value))
                }
                placeholder="0"
                className="w-full h-[50px] rounded-[10px] pl-[20px] py-[15px] border border-lightgray-sunsu text-sm bg-transparent text-right pr-[34px]"
              />
              <p className="absolute right-[20px] text-sm text-gray-sunsu">
                원
              </p>
            </div>
          </Box>

          {errorMessage && (
            <AlertBox
              id="errorMessage"
              className="mt-[10px] pl-[20px] py-[15px] text-xs rounded-[10px] border"
              label={errorMessage}
            />
          )}
          {isSubmitting ? (
            <div className=" w-full h-[50px] mt-[30px] bg-zinc-200 rounded-[10px] flex items-center justify-center">
              <CircularProgress
                color="primary"
                style={{ width: "30px", height: "30px" }}
              />
            </div>
          ) : (
            <Button
              onClick={() => {
                handleSubmit();
              }}
              disabled={isSubmitting}
              className={`block w-full h-[50px] mt-[30px] rounded-[10px] font-normal text-sm ${
                isSubmitting ? "bg-zinc-300" : "bg-lightskyblue-sunsu"
              }`}
            >
              수정하기
            </Button>
          )}
        </form>
      </Box>
    </div>
  );
};

export default QuotationUpdatePage;
