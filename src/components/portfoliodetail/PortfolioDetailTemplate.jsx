import CircularProgress from "@mui/material/CircularProgress";
import {
  child,
  getDatabase,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createChatRoom } from "../../apis/chat";
import { ReactComponent as StarIcon } from "../../assets/star-02.svg";
import "../../firebase";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";
import useOpenBottomSheet from "../../hooks/useOpenBottomSheet";
import Button from "../common/atoms/Button";
import DivideBar from "../common/atoms/DivideBar";
import PaymentBottomSheet from "../common/bottomsheet/PaymentBottomSheet";
import DescriptionRow from "./DescriptionRow";
import FavoriteButton from "./FavoriteButton";
import HistoryBottomSheet from "./HistoryBottomSheet";
import MembershipPaySection from "./MembershipPaySection";
import PaymentsHistorySection from "./PaymentsHistorySection";
import PlannerInfoRow from "./PlannerInfoRow";
import PortfolioCarousel from "./PortfolioCarousel";

const PortfolioDetailTemplate = ({ portfolio }) => {
  const { isLogged, userInfo } = useSelector((state) => state.user);
  const [paymentBottomSheetOpen, setPaymentBottomSheetOpen] = useState(false);
  const [historyBottomSheetOpen, setHistoryBottomSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const { openBottomSheetHandler } = useOpenBottomSheet();

  const handleOpenPaymentBottomSheet = () => {
    if (!isLogged) {
      openBottomSheetHandler({ bottomSheet: "loginBottomSheet" });
      return;
    }
    setPaymentBottomSheetOpen(true);
  };

  const handleOnCreateChatRoom = async () => {
    if (!isLogged) {
      openBottomSheetHandler({ bottomSheet: "loginBottomSheet" });
      return;
    }
    setIsSubmitting(true);
    try {
      const {
        response: { chatId, existed },
      } = await createChatRoom(portfolio.userId);
      if (existed) {
        navigate(`/chat/${chatId}`);
        return;
      }
      // 채팅방이 없을 경우 새로 만들어준다.
      const db = getDatabase();
      const userRef = ref(db, `users/${userInfo.userId}`);
      const counterUserRef = ref(db, `users/${portfolio.userId}`);
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
      defaultErrorHandler(error);
    } finally {
      setIsSubmitting(false);
    }
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
      {/* 플래너 정보 */}
      <PlannerInfoRow
        plannerName={portfolio.plannerName}
        contractCount={portfolio.contractCount}
        location={portfolio.location}
        title={portfolio.title}
        priceInfo={portfolio.priceInfo}
      />
      {/* 찜하기 & 리뷰 */}
      <div className=" flex w-full border-t items-center">
        <div className="h-[50px] w-1/2 border-r flex justify-center">
          <FavoriteButton isLiked={portfolio.isLiked} />
        </div>
        <div className="h-[50px] w-1/2 flex items-center justify-center">
          <Link to={`/portfolios/reviews/${portfolio.userId}`}>
            <div className="flex gap-[10px] items-center">
              <span className="font-bold">리뷰</span>
              <div className="flex gap-1 items-center">
                <StarIcon className="w-[16px] h-[16px] object-cover mb-[1px]" />
                <div className="text-base align-middle font-bold">
                  {portfolio.avgStars.toFixed(1)}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* 플래너 소개 */}
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
            <PaymentsHistorySection
              portfolio={portfolio}
              setHistoryBottomSheetOpen={setHistoryBottomSheetOpen}
            />
          ) : (
            <MembershipPaySection
              handleOpenPaymentBottomSheet={handleOpenPaymentBottomSheet}
            />
          )}
        </div>
      </div>
      {!(userInfo.role === "planner") && (
        <Button
          className="w-full h-[50px] mt-3 flex items-center justify-center bg-lightskyblue-sunsu text-sm"
          onClick={handleOnCreateChatRoom}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={20} />
          ) : (
            <span>채팅 상담 받기</span>
          )}
        </Button>
      )}
    </div>
  );
};

export default PortfolioDetailTemplate;
