import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { paymentApprovalAndUserUpgrade } from "../apis/payments";
import { fetchUserInfo } from "../store/slices/userSlice";
import useDefaultErrorHandler from "../hooks/useDefaultErrorHandler";

export default function PaymentCompletePage() {
  const [isApproving, setIsApproving] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const amount = searchParams.get("amount");
  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");
  const { defaultErrorHandler } = useDefaultErrorHandler();

  useEffect(() => {
    if (!amount || !orderId || !paymentKey) {
      navigate(`/payments/fail?message=결제 정보가 올바르지 않습니다.`);
      return;
    }

    (async () => {
      try {
        await paymentApprovalAndUserUpgrade({
          orderId,
          amount,
          paymentKey,
        });
        // 유저 정보 최신화 과정
        dispatch(fetchUserInfo());
        setIsApproving(false);
      } catch (error) {
        const customError = error?.response?.data?.error;
        if (customError) {
          navigate(`/payments/fail?message=${customError.message}`);
          return;
        }
        defaultErrorHandler(error);
      }
    })();
  }, []);

  if (isApproving)
    return (
      <div className=" w-full h-[50px] mt-[30px] flex items-center justify-center">
        <CircularProgress color="primary" size={30} />
      </div>
    );

  return (
    <div className="flex flex-col tracking-tight h-[calc(100vh-50px)] w-full">
      <div className=" grow p-10 flex justify-between flex-col">
        <div>
          <h1 className=" text-2xl font-medium pt-10">
            순수 멤버십 <span className=" text-blue-sunsu">결제가 완료</span>
            되었습니다.
          </h1>
          <h3 className=" tracking-tighter text-sm flex flex-col pt-5 ">
            <span>이제 모든 웨딩플래너의 매칭 내역을</span>
            <span>자유롭게 확인해보세요!</span>
          </h3>
        </div>
        <div className=" flex justify-center gap-3 font-medium text-sm text-center">
          <button
            onClick={() => navigate(-1)}
            className=" w-1/2 bg-white text-black rounded-md py-2 px-4 border border-solid hover:bg-zinc-200"
          >
            이전으로
          </button>
          <Link
            className="w-1/2 bg-skyblue-sunsu text-white rounded-md py-2 px-4 hover:bg-blue-sunsu"
            to="/"
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
