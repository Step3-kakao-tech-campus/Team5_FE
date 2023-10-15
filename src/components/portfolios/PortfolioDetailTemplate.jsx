import CircularProgress from "@mui/material/CircularProgress";
import {
  child,
  get,
  getDatabase,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import { useSetAtom } from "jotai";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createChatRoom } from "../../apis/chat";
import { ReactComponent as RightArrow } from "../../assets/right-01.svg";
import "../../firebase";
import { paymentAtom } from "../../store";
import { comma } from "../../utils/convert";
import Button from "../common/atoms/Button";
import DivideBar from "../common/atoms/DivideBar";
import PaymentBottomSheet from "../profile/PaymentBottomSheet";
import DescriptionRow from "./DescriptionRow";
import HistoryBottomSheet from "./HistoryBottomSheet";
import PortfolioCarousel from "./PortfolioCarousel";
import PriceInfoRow from "./PriceInfoRow";

const PortfolioDetailTemplate = ({ portfolio }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [paymentBottomSheetOpen, setPaymentBottomSheetOpen] = useState(false);
  const [historyBottomSheetOpen, setHistoryBottomSheetOpen] = useState(false);
  const setPayment = useSetAtom(paymentAtom);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnCreateChatRoom = async () => {
    setIsSubmitting(true);
    const db = getDatabase();
    const userRef = ref(db, `users/${userInfo.userId}`);
    const counterUserRef = ref(db, `users/${portfolio.userId}`);
    try {
      const snapshot = await get(userRef);
      const data = snapshot.val();
      if (data && data.chatRooms) {
        const chatIds = Object.keys(data.chatRooms);
        const existChatRoom = chatIds.find((chatId) => {
          const chatRoom = data.chatRooms[chatId];
          return chatRoom.counterId === portfolio.userId;
        });
        if (existChatRoom) {
          // console.log("이미 채팅방이 존재합니다.");
          navigate(`/chat/${existChatRoom}`);
          return;
        }
      }
      // 채팅방이 없을 경우 새로 만들어준다.
      const res = await createChatRoom(portfolio.userId);
      const { chatId } = res.response;
      await set(child(userRef, `chatRooms/${chatId}`), {
        chatId,
        counterId: portfolio.userId,
        counterName: portfolio.plannerName,
        lastVisited: serverTimestamp(),
      });
      await set(child(counterUserRef, `chatRooms/${chatId}`), {
        chatId,
        counterId: userInfo.userId,
        counterName: userInfo.username,
        lastVisited: serverTimestamp(),
      });
      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-full h-full relative">
      {paymentBottomSheetOpen && (
        <PaymentBottomSheet onClose={() => setPaymentBottomSheetOpen(false)} />
      )}
      {historyBottomSheetOpen && (
        <HistoryBottomSheet onClose={() => setHistoryBottomSheetOpen(false)} />
      )}
      <div>
        <PortfolioCarousel portfolio={portfolio} />
      </div>
      <div className="p-5 justify-between">
        <div className="flex whitespace-nowrap">
          <div className="inline mr-auto text-xl">
            <em className="font-bold not-italic">{portfolio.plannerName}</em>{" "}
            플래너 | {portfolio.location}
          </div>
          <div className="inline text-sm text-blue-sunsu">
            <em className="font-bold not-italic">{portfolio.contractCount}</em>
            건 매칭
          </div>
        </div>
        <div className="pt-[5px] text-xs text-gray-sunsu">
          {portfolio.title}
        </div>
        <div className="pt-5">
          <PriceInfoRow priceInfo={portfolio.priceInfo} />
        </div>
      </div>
      <DivideBar />
      <DescriptionRow title="소개" detail={portfolio.description} />
      <DivideBar />
      <DescriptionRow title="경력" detail={portfolio.career} />
      <DivideBar />
      <DescriptionRow
        title="주요 제휴 업체"
        detail={portfolio.partnerCompany}
      />
      <DivideBar />
      <div className="justify-between p-5">
        <div className="text-base font-bold">이전 매칭 내역</div>
        <div className="pt-5">
          {userInfo.grade === "premium" ? (
            <>
              <div className="flex h-[80px] pb-5 border-b">
                <div className="flex flex-col float-left w-[45%] items-center justify-center border-r border-lightgray-sunsu">
                  <div className="text-lg">
                    <em className="font-bold not-italic">
                      {comma(portfolio.paymentHistory.avgPrice)}
                    </em>
                    원
                  </div>
                  <div className="text-sm text-gray-sunsu">평균</div>
                </div>
                <div className="flex flex-col float-right w-[55%] items-center justify-center">
                  <div className="flex items-center pb-[5px] border-b border-lightgray-sunsu">
                    <span className="mr-2.5 text-sm text-gray-sunsu">최대</span>
                    <span className="text-lg">
                      <em className="font-bold not-italic">
                        {comma(portfolio.paymentHistory.maxPrice)}
                      </em>
                      원
                    </span>
                  </div>
                  <div className="flex items-center pt-[5px]">
                    <span className="mr-2.5 text-sm text-gray-sunsu">최소</span>
                    <span className="text-lg">
                      <em className="font-bold not-italic">
                        {comma(portfolio.paymentHistory.minPrice)}
                      </em>
                      원
                    </span>
                  </div>
                </div>
              </div>
              <div>
                {portfolio.paymentHistory.payments?.map((payment, idx) => (
                  <Button
                    onClick={() => {
                      setPayment(payment);
                      setHistoryBottomSheetOpen(true);
                    }}
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    className="block w-full mt-3"
                  >
                    <div className="flex text-sm items-center">
                      <div className="inline text-gray-sunsu pl-2.5">
                        {payment.confirmedAt}
                      </div>
                      <div className="inline ml-auto">
                        <em className="font-bold not-italic">
                          {comma(payment.price)}
                        </em>
                        원
                      </div>
                      <div className="inline mx-2.5">
                        <RightArrow />
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-[46px]">
              <div className="inline text-sm mr-auto">
                이전 매칭 내역을 확인하려면 순수 멤버십을 결제하셔야 합니다.
              </div>
              <div className="inline min-w-[100px] max-w-[110px] w-full">
                <Button
                  onClick={() => {
                    setPaymentBottomSheetOpen(true);
                  }}
                  className="block w-full h-full rounded-[10px] font-normal text-sm bg-lightskyblue-sunsu"
                >
                  결제하기
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <DivideBar />
      <div className=" w-full p-5 flex items-center justify-center flex-col gap-1">
        <h4 className="text-sm">지금 바로 상담 받아보세요.</h4>
        <Button
          className="w-1/2 min-w-[240px] h-[30px] bg-skyblue-sunsu text-white p-1 rounded-md flex items-center justify-center"
          onClick={handleOnCreateChatRoom}
          disabled={isSubmitting}
        >
          {isSubmitting && <CircularProgress size={15} />}
          {isSubmitting ? "" : "견적 상담받기"}
        </Button>
      </div>
    </div>
  );
};

export default PortfolioDetailTemplate;
