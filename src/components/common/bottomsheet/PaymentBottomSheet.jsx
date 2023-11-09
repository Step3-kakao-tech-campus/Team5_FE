import { loadTossPayments } from "@tosspayments/payment-sdk";
import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { savePayment } from "../../../apis/payments";
import useDefaultErrorHandler from "../../../hooks/useDefaultErrorHander";
import { sunsuMembershipPrice } from "../../../utils/constants";
import { comma } from "../../../utils/convert";
import Button from "../atoms/Button";
import BottomSheet from "./BottomSheet";

// done test
export default function PaymentBottomSheet({ onClose }) {
  const { userInfo } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const tossPaymentsRef = useRef(null);
  const { defaultErrorHandler } = useDefaultErrorHandler();

  const handleOnPayment = async () => {
    try {
      setIsLoading(true);
      const tosspayments = await loadTossPayments(
        process.env.REACT_APP_TOSS_CLIENT_KEY,
      );
      tossPaymentsRef.current = tosspayments;
      // 요청을 보내기 전 결제정보를 DB에 저장하는 과정이 필요함
      const newOrderId = nanoid();
      await savePayment({
        amount: sunsuMembershipPrice,
        orderId: newOrderId,
      });
      await tosspayments.requestPayment("카드", {
        amount: sunsuMembershipPrice,
        orderId: newOrderId,
        orderName: "순수 멤버십",
        successUrl: `${window.location.origin}/payments/complete`,
        failUrl: `${window.location.origin}/payments/fail`,
        customerName: userInfo.username,
      });
    } catch (error) {
      console.error("결제 작업 중 오류 발생:", error);
      console.log(error);
      defaultErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  // page 전환시 iframe이 남아있는 문제 해결
  useEffect(() => {
    return () => {
      tossPaymentsRef?.current?.cancelPayment();
    };
  }, [tossPaymentsRef]);

  return (
    <BottomSheet onClose={onClose}>
      <div>
        <div className="flex flex-col tracking-tight font-bold text-lg">
          <span>한 번만 결제하면</span>
          <span>모든 웨딩플래너의 매칭 내역 열람 가능</span>
        </div>
        <div className="text-xs text-gray-sunsu pt-[5px]">
          단, 예비 신랑신부 회원은 결혼 과정이 끝나는 시점에 멤버십이 자동
          해지됩니다.
        </div>
        <div className="py-5 text-lg">
          <span className="font-bold">{comma(sunsuMembershipPrice)}원</span>
          <span>에 순수 멤버십을 이용해보세요.</span>
        </div>
        <Button
          className="block w-full h-[50px] rounded-[10px] text-sm bg-lightskyblue-sunsu"
          onClick={() => {
            handleOnPayment();
          }}
          disabled={isLoading}
        >
          결제하기
        </Button>
      </div>
    </BottomSheet>
  );
}
