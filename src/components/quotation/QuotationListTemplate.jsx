import { useSetAtom } from "jotai";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../assets/add-01.svg";
import { ReactComponent as StarIcon } from "../../assets/star-01.svg";
import { quotationItemAtom } from "../../store";
import { comma } from "../../utils/convert";
import AlreadyConfirmBottomSheet from "./AlreadyConfirmBottomSheet";
import ConfirmAllBottomSheet from "./ConfirmAllBottomSheet";
import ConfirmOneBottomSheet from "./ConfirmOneBottomSheet";
import RequiredConfirmBottomSheet from "./RequiredConfirmBottomSheet";

const QuotationListTemplate = ({ quotation }) => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [confirmOneSheetOpen, setConfirmOneSheetOpen] = useState(false);
  const [confirmAllSheetOpen, setConfirmAllSheetOpen] = useState(false);
  const [requiredConfirmBottomSheetOpen, setRequiredConfirmBottomSheetOpen] =
    useState(false);
  const [alreadyConfirmBottomSheetOpen, setAlreadyConfirmBottomSheetOpen] =
    useState(false);
  const [quotationId, setQuotationId] = useState(null);
  const setQuotationItem = useSetAtom(quotationItemAtom);
  const { userInfo } = useSelector((state) => state.user);

  const handleOnConfirmAll = () => {
    if (quotation.status === "완료") {
      // 이전에 이미 확정을 한 경우
      setAlreadyConfirmBottomSheetOpen(true);
      return;
    }
    // 전체 확정을 안 한 경우
    const isConfirmedAll = quotation.quotations.every(
      (quotationItem) => quotationItem.status === "완료",
    );
    if (isConfirmedAll) {
      setConfirmAllSheetOpen(true);
    } else {
      setRequiredConfirmBottomSheetOpen(true);
    }
  };

  return (
    <div>
      {alreadyConfirmBottomSheetOpen && (
        <AlreadyConfirmBottomSheet
          onClose={() => setAlreadyConfirmBottomSheetOpen(false)}
        />
      )}
      {requiredConfirmBottomSheetOpen && (
        <RequiredConfirmBottomSheet
          onClose={() => setRequiredConfirmBottomSheetOpen(false)}
        />
      )}
      {confirmOneSheetOpen && (
        <ConfirmOneBottomSheet
          onClose={() => setConfirmOneSheetOpen(false)}
          quotationId={quotationId}
          chatId={chatId}
        />
      )}
      {confirmAllSheetOpen && (
        <ConfirmAllBottomSheet
          onClose={() => setConfirmAllSheetOpen(false)}
          chatId={chatId}
        />
      )}
      {quotation.quotations.map((quotationItem) => (
        <div className="pt-[30px] px-[29px]" key={quotationItem.id}>
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
                결제미완료
                {userInfo.role === "planner" && (
                  <>
                    <span> | </span>
                    <button
                      className="underline text-red-sunsu font-bold"
                      onClick={() => {
                        setConfirmOneSheetOpen(true);
                        setQuotationId(quotationItem.id);
                      }}
                    >
                      결제완료로 변경
                    </button>
                  </>
                )}
              </span>
            )}
          </div>
          <div className="pt-[2px] text-xs text-gray-sunsu">
            <span>최종 수정일 {quotationItem.modifiedAt}</span>
            {quotationItem.status === "미완료" &&
              userInfo.role === "planner" && (
                <>
                  <span> | </span>
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
                </>
              )}
          </div>
        </div>
      ))}
      {userInfo.role === "planner" ? (
        <button
          className="absolute bottom-[79px] right-[29px] w-[130px] h-[60px] flex rounded-2xl bg-lightskyblue-sunsu text-base text-black justify-center items-center"
          onClick={() => navigate(`/quotations/create/${chatId}`)}
        >
          <AddIcon className="w-4 h-4 mr-2" />
          추가하기
        </button>
      ) : (
        <button
          className="absolute bottom-[79px] right-[29px] w-[130px] h-[60px] flex rounded-2xl bg-lightskyblue-sunsu text-base text-black justify-center items-center hover:shadow-lg"
          onClick={handleOnConfirmAll}
        >
          <StarIcon className="w-4 h-4 mr-2" />
          확정하기
        </button>
      )}
    </div>
  );
};

export default QuotationListTemplate;
