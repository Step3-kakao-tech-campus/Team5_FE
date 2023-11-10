import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import useFetchQuotationCollect from "../../hooks/useFetchQuotationCollect";
import Spinner from "../common/atoms/Spinner";
import Container from "../common/atoms/Container";
import ConfirmOneBottomSheet from "./ConfirmOneBottomSheet";
import { comma } from "../../utils/convert";
import { quotationItemAtom } from "../../store";
import SkeletonQuotationItem from "./SkeletonQuotationItem";
import DeleteOneBottomSheet from "./DeleteOneBottomSheet";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";

const QuotationCollectTemplate = () => {
  const navigate = useNavigate();
  const [confirmOneSheetOpen, setConfirmOneSheetOpen] = useState(false);
  const [deleteOneSheetOpen, setDeleteOneSheetOpen] = useState(false);
  const [quotationId, setQuotationId] = useState(null);
  const [chatId, setChatId] = useState(null);
  const setQuotationItem = useSetAtom(quotationItemAtom);
  const { userInfo } = useSelector((state) => state.user);
  const bottomObserver = useRef(null);
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const {
    isFetchingNextPage, // 다음 페이지를 가져오는 요청이 진행 중인지 여부
    error,
    hasNextPage,
    isLoading,
    fetchNextPage,
    chats,
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
      defaultErrorHandler(error);
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
        {deleteOneSheetOpen && (
          <DeleteOneBottomSheet
            onClose={() => setDeleteOneSheetOpen(false)}
            quotationId={quotationId}
          />
        )}
        <div className="mb-[24px]">
          {chats.map((chat) => (
            <div
              className="py-[24px] mx-[29px] border-b border-lightgray-sunsu"
              key={chat.chatId}
            >
              <div className="flex text-base text-darkgray-sunsu">
                <span className="font-bold">{chat.partnerName}</span>
                {userInfo.role === "planner" ? (
                  <span className="mr-[3px]">님 |</span>
                ) : (
                  <span className="mx-[3px]">플래너님 |</span>
                )}
                {chat.status === "완료" ? (
                  <span className="text-gray-sunsu">확정 완료</span>
                ) : (
                  <span className="text-blue-sunsu font-bold">진행 중</span>
                )}
                <Link
                  to={`/chat/${chat.chatId}`}
                  className="ml-auto text-sm text-darkgray-sunsu font-bold underline"
                >
                  채팅방으로 이동
                </Link>
              </div>
              {chat.quotations?.map((quotationItem) => (
                <div className="pt-[15px]" key={quotationItem.id}>
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
                                setChatId(chat.chatId);
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
                                `/quotations/update/${quotationItem.id}?chatId=${chat.chatId}`,
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
          ))}
          {isFetching && <SkeletonQuotationItem />}
        </div>
      </Container>
      <div ref={bottomObserver} />
    </>
  );
};

export default QuotationCollectTemplate;
