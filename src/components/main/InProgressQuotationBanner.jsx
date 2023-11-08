import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuotationCollectList } from "../../apis/quotation";
import Button from "../common/atoms/Button";

const InProgressQuotationBanner = () => {
  const navigate = useNavigate();
  const [firstInProgressChat, setFirstInProgressChat] = useState(null);
  const { data, error } = useQuery(`/quotations/collect`, () =>
    getQuotationCollectList(0),
  );

  useEffect(() => {
    if (data?.chats && data?.chats?.some((chat) => chat.status === "미완료")) {
      setFirstInProgressChat(
        data?.chats?.find((chat) => chat.status === "미완료"),
      );
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    firstInProgressChat && (
      <Button
        onClick={() =>
          navigate(
            `/quotations/${
              firstInProgressChat.chatId
            }?partnerName=${encodeURIComponent(
              firstInProgressChat.partnerName,
            )}`,
          )
        }
      >
        <div className="fixed flex flex-col w-[calc(100%-40px)] max-w-[536px] h-[70px] px-[25px] pt-[14px] bottom-[70px] left-1/2 translate-x-[-50%] rounded-lg border border-lightgray-sunsu z-30 bg-white opacity-95">
          <div className="flex text-sm">
            <span className="mr-[3px] text-blue-sunsu font-bold">
              {firstInProgressChat.partnerName}
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
