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
import DeleteOneBottomSheet from "./DeleteOneBottomSheet";
import RequiredConfirmBottomSheet from "./RequiredConfirmBottomSheet";

const QuotationListTemplate = ({ quotation }) => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [confirmOneSheetOpen, setConfirmOneSheetOpen] = useState(false);
  const [confirmAllSheetOpen, setConfirmAllSheetOpen] = useState(false);
  const [deleteOneSheetOpen, setDeleteOneSheetOpen] = useState(false);
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
      {deleteOneSheetOpen && (
        <DeleteOneBottomSheet
          onClose={() => setDeleteOneSheetOpen(false)}
          quotationId={quotationId}
        />
      )}
      <div className="mb-[95px]">
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
                  <span className="text-red-sunsu">결제미완료</span>
                  {userInfo.role === "planner" && (
                    <>
                      <span> | </span>
                      <button
                        className="underline text-blue-sunsu font-bold"
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
                    <span className="mx-[5px]">|</span>
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
                    <span className="mx-[5px]">|</span>
                    <button
                      className="underline text-red-sunsu font-bold"
                      onClick={() => {
                        setDeleteOneSheetOpen(true);
                        setQuotationId(quotationItem.id);
                      }}
                    >
                      삭제하기
                    </button>
                  </>
                )}
            </div>
          </div>
        ))}
      </div>
      {userInfo.role === "planner" ? (
        <button
          className="fixed flex bottom-[70px] right-[29px] w-[130px] h-[60px] rounded-2xl text-base text-black justify-center items-center z-30 bg-lightskyblue-sunsu opacity-95"
          onClick={() => {
            if (quotation.status === "완료") {
              setAlreadyConfirmBottomSheetOpen(true);
              return;
            }
            navigate(`/quotations/create/${chatId}`);
          }}
        >
          <AddIcon className="w-4 h-4 mr-2" />
          추가하기
        </button>
      ) : (
        <button
          className="fixed flex bottom-[70px] right-[29px] w-[130px] h-[60px] rounded-2xl text-base text-black justify-center items-center z-30 bg-lightskyblue-sunsu opacity-95"
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
