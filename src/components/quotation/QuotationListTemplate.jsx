import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useSetAtom } from "jotai";
import ConfirmOneBottomSheet from "./ConfirmOneBottomSheet";
import { comma } from "../../utils/convert";
import { ReactComponent as AddIcon } from "../../assets/add-01.svg";
import { quotationItemAtom } from "../../store";

const QuotationListTemplate = ({ quotation }) => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [confirmOneSheetOpen, setConfirmOneSheetOpen] = useState(false);
  const [quotationId, setQuotationId] = useState(null);
  const setQuotationItem = useSetAtom(quotationItemAtom);

  return (
    <div>
      {confirmOneSheetOpen && (
        <ConfirmOneBottomSheet
          onClose={() => setConfirmOneSheetOpen(false)}
          quotationId={quotationId}
          chatId={chatId}
        />
      )}
      {quotation.quotations.map((quotationItem) => (
        <div className="pt-[30px] px-[29px]">
          <div className="flex">
            <span className="text-base text-blue-sunsu">
              {quotationItem.company}
            </span>
            <span className="mr-auto ml-[4px] mt-[4px] text-xs text-gray-sunsu">
              {"| "}
              {quotationItem.title}
            </span>
            <span className="text-base font-bold">
              {comma(quotationItem.price)}
            </span>
            <span className="text-base">원</span>
          </div>
          <div className="pt-[5px] text-sm">{quotationItem.description}</div>
          <div className="pt-[5px] text-xs text-gray-sunsu">
            {quotationItem.status === "완료" ? (
              <span>결제완료</span>
            ) : (
              <span>
                결제미완료 |{" "}
                <button
                  className="underline text-red-sunsu font-bold"
                  onClick={() => {
                    setConfirmOneSheetOpen(true);
                    setQuotationId(quotationItem.id);
                  }}
                >
                  결제완료로 변경
                </button>
              </span>
            )}
          </div>
          <div className="pt-[2px] text-xs text-gray-sunsu">
            <span>최종 수정일 {quotationItem.modifiedAt}</span>
            {quotationItem.status === "미완료" && (
              <span>
                {" "}
                |{" "}
                <button
                  className="underline text-black font-bold"
                  onClick={() => {
                    setQuotationItem(quotationItem);
                    navigate(
                      `/quotations/update/${quotationItem.id}?chatId=${chatId}`,
                    );
                  }}
                >
                  수정하기
                </button>
              </span>
            )}
          </div>
        </div>
      ))}
      <button
        className="absolute bottom-[79px] right-[29px] w-[130px] h-[60px] flex rounded-2xl bg-lightskyblue-sunsu text-base text-black justify-center items-center"
        onClick={() => navigate(`/quotations/create/${chatId}`)}
      >
        <AddIcon className="w-4 h-4 mr-2" />
        추가하기
      </button>
    </div>
  );
};

export default QuotationListTemplate;
