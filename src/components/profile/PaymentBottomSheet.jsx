import { loadTossPayments } from "@tosspayments/payment-sdk";
import { nanoid } from "nanoid";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { sunsuMembershipPrice } from "../../utils/constants";
import BottomSheet from "../common/BottomSheet";
import Button from "../common/atoms/Button";
import { savePayment } from "../../apis/payments";

export default function PaymentBottomSheet({ handler }) {
  const { userInfo } = useSelector((state) => state.user);
  const tossPaymentsRef = useRef(null);
  const handleOnPayment = async () => {
    try {
      const tosspayments = await loadTossPayments(
        process.env.REACT_APP_TOSS_CLIENT_KEY
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
        successUrl: `${window.location.origin}/payments`,
        failUrl: `${window.location.origin}/payments/fail`,
        customerName: userInfo.name,
        customerEmail: userInfo.email,
      });
    } catch (error) {
      console.error("비동기 작업 중 오류 발생:", error);
    }
  };

  // page 전환시 iframe이 남아있는 문제 해결
  useEffect(() => {
    return () => {
      tossPaymentsRef?.current?.cancelPayment();
    };
  }, [tossPaymentsRef]);

  return (
    <BottomSheet handler={handler}>
      <div>
        <div className="flex flex-col tracking-tight font-bold text-lg">
          <span>한 번만 결제하면</span>
          <span>모든 웨딩플래너의 매칭 내역 열람 가능</span>
        </div>
        <div>
          <span className="text-xs text-zinc-500">
            단, 예비 신랑신부 회원은 결혼 과정이 끝나는 시점에 멤버십이 자동
            해지됩니다.
          </span>
        </div>
        <div className="py-5 text-xl">
          <span className="font-bold">6,900원</span>
          <span>에 순수 멤버십을 이용해보세요.</span>
        </div>
        <Button
          className="block w-full h-[50px] mt-[10px] rounded-[10px] font-normal text-sm bg-lightskyblue-sunsu"
          onClick={() => {
            handleOnPayment();
          }}
        >
          결제하기
        </Button>
      </div>
    </BottomSheet>
  );
}
