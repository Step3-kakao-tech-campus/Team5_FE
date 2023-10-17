import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { upgradePayment } from "../apis/payments";
import { comma } from "../utils/convert";

export default function PaymentCompletePage() {
  const [isFetching, setIsFetching] = useState(true);
  const { userInfo } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const [paymentResults, setPaymentResults] = useState({});
  const orderId = searchParams.get("orderId");
  const secretKey = process.env.REACT_APP_TOSS_SECRET_KEY;
  const basicToken = btoa(`${secretKey}:`);
  const url = `https://api.tosspayments.com/v1/payments/orders/${orderId}`;

  useEffect(() => {
    (async () => {
      // orderId 조회
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Basic ${basicToken}`,
            "Content-Type": "application/json",
          },
        });
        const res = await response.json();
        setPaymentResults(res);
        setIsFetching(false);
        const { status, totalAmount } = res;
        if (res.status === "DONE") {
          await upgradePayment({ orderId, status, amount: totalAmount });
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [searchParams]);

  if (isFetching)
    return (
      <div className=" w-full h-[50px] mt-[30px] flex items-center justify-center">
        <CircularProgress color="primary" size={30} />
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-10 tracking-tighter">
      <div className="flex flex-col gap-1 items-center pt-20">
        <h1 className="text-2xl font-medium">
          결제가 <span className=" text-blue-sunsu">성공적으로 완료</span>{" "}
          되었습니다.
        </h1>
        <h2 className="font-normal p-1 bg-zinc-100 px-5 rounded">
          모든 웨딩플래너의 매칭내역을 열람가능하십니다.
        </h2>
      </div>
      <div className="w-4/5 text-sm">
        <h3 className="font-medium text-base">결제 내역</h3>
        <div>
          <div className="flex justify-between border-solid border-0 border-zinc-300 border-t border-b">
            <span>상품명</span>
            <span>{paymentResults.orderName}</span>
          </div>
          <div className="flex justify-between">
            <span>결제 금액</span>
            <span className=" text-red-600">
              {comma(paymentResults.totalAmount)}원
            </span>
          </div>
        </div>
      </div>
      <div className="w-4/5 tracking-tight text-sm">
        <h3 className="font-medium text-base">결제 정보</h3>
        <div className="flex justify-between border-solid border-0 border-zinc-300 border-t border-b">
          <span>이름</span>
          <span>{userInfo.username}</span>
        </div>
        <div className="flex justify-between border-solid border-0 border-zinc-300 border-b">
          <span>승인 일시</span>
          <span>
            {dayjs(paymentResults.approvedAt).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </div>
        <div className="flex justify-between">
          <span>주문ID</span>
          <span>{paymentResults.orderId}</span>
        </div>
      </div>
      <Link
        className="w-fit bg-blue-sunsu text-white rounded-md py-2 px-4"
        to="/"
      >
        홈으로
      </Link>
    </div>
  );
}
