import { useQuery } from "react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuotationCollectList } from "../../apis/quotation";
import Button from "../common/atoms/Button";

const InProgressQuotationBanner = () => {
  const navigate = useNavigate();
  const { data, error } = useQuery(`/quotations/collect`, () =>
    getQuotationCollectList(1),
  );

  const hasInProgressQuotation =
    data?.quotations &&
    data?.quotations?.some((quotation) => quotation.status === "미완료");

  const firstInProgressQuotation = data?.quotations?.find(
    (quotation) => quotation.status === "미완료",
  );

  useEffect(() => {
    if (error) {
      console.error(error.message);
      alert("서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
    }
  }, [error]);

  return (
    hasInProgressQuotation && (
      <Button
        onClick={() =>
          navigate(
            `/quotations/${
              firstInProgressQuotation.chatId
            }?partnerName=${encodeURIComponent(
              firstInProgressQuotation.partnerName,
            )}`,
          )
        }
      >
        <div className="fixed flex flex-col w-[calc(100%-40px)] max-w-[536px] h-[70px] px-[25px] pt-[13px] bottom-[70px] left-1/2 translate-x-[-50%] rounded-lg border border-lightgray-sunsu z-30 bg-white opacity-95">
          <div className="flex text-sm">
            <span className="mr-[3px] text-blue-sunsu font-bold">
              {firstInProgressQuotation.partnerName}
            </span>
            플래너와
          </div>
          <div className="flex text-sm">
            <span className="mr-auto">진행 중인 견적서가 있어요.</span>
            <span className="text-gray-sunsu"> 견적서 바로가기 &gt;</span>
          </div>
        </div>
      </Button>
    )
  );
};

export default InProgressQuotationBanner;
