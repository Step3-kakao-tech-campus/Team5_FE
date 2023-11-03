import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import useFetchQuotationCollect from "../../hooks/useFetchQuotationCollect";
import Spinner from "../common/atoms/Spinner";
import Container from "../common/atoms/Container";
import ConfirmOneBottomSheet from "./ConfirmOneBottomSheet";
import { comma } from "../../utils/convert";
import { quotationItemAtom } from "../../store";
import SkeletonQuotationItem from "./SkeletonQuotationItem";

const QuotationCollectTemplate = () => {
  const navigate = useNavigate();
  const [confirmOneSheetOpen, setConfirmOneSheetOpen] = useState(false);
  const [quotationId, setQuotationId] = useState(null);
  const [chatId, setChatId] = useState(null);
  const setQuotationItem = useSetAtom(quotationItemAtom);
  const { userInfo } = useSelector((state) => state.user);
  const bottomObserver = useRef(null);
  const {
    isFetchingNextPage, // 다음 페이지를 가져오는 요청이 진행 중인지 여부
    error,
    hasNextPage,
    isLoading,
    fetchNextPage,
    quotations,
    isFetching,
  } = useFetchQuotationCollect();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    if (bottomObserver.current && hasNextPage) {
      io.observe(bottomObserver.current);
    }
    return () => {
      io.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (error) {
      console.error(error.message);
      alert("서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
    }
  }, [error]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Container>
        {confirmOneSheetOpen && (
          <ConfirmOneBottomSheet
            onClose={() => setConfirmOneSheetOpen(false)}
            quotationId={quotationId}
            chatId={chatId}
          />
        )}
        <div className="my-[15px]">
          {quotations?.map((quotationItem) => (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {quotationItem && (
                <div className="py-[15px] mx-[29px] border-b border-lightgray-sunsu">
                  <div className="text-xs text-darkgray-sunsu">
                    <span className="font-bold">
                      {quotationItem.partnerName}
                    </span>
                    {userInfo.role === "planner" ? (
                      <span>님</span>
                    ) : (
                      <span> 플래너님</span>
                    )}
                  </div>
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
                  <div className="pt-[5px] text-sm">
                    {quotationItem.description}
                  </div>
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
                                setChatId(quotationItem.chatId);
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
                                `/quotations/update/${quotationItem.id}?chatId=${quotationItem.chatId}`,
                              );
                            }}
                          >
                            수정하기
                          </button>
                        </>
                      )}
                  </div>
                </div>
              )}
            </>
          ))}
          {isFetching && (
            <>
              <SkeletonQuotationItem />
              <SkeletonQuotationItem />
            </>
          )}
        </div>
      </Container>
      <div ref={bottomObserver} />
    </>
  );
};

export default QuotationCollectTemplate;
