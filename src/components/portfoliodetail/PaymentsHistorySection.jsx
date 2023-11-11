import React from "react";
import { useSetAtom } from "jotai";
import { paymentAtom } from "../../store";
import { comma } from "../../utils/convert";
import { ReactComponent as RightArrow } from "../../assets/right-01.svg";
import Button from "../common/atoms/Button";

// done test
export default function PaymentHistorySection({
  portfolio,
  setHistoryBottomSheetOpen,
}) {
  const setPayment = useSetAtom(paymentAtom);

  return (
    <>
      <div className="flex h-[80px] pb-5 border-b">
        <div className="flex flex-col float-left w-[45%] items-center justify-center border-r border-lightgray-sunsu">
          <div className="text-lg">
            <em className="font-bold not-italic">
              {comma(portfolio.paymentsHistory.avgPrice)}
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
                {comma(portfolio.paymentsHistory.maxPrice)}
              </em>
              원
            </span>
          </div>
          <div className="flex items-center pt-[5px]">
            <span className="mr-2.5 text-sm text-gray-sunsu">최소</span>
            <span className="text-lg">
              <em className="font-bold not-italic">
                {comma(portfolio.paymentsHistory.minPrice)}
              </em>
              원
            </span>
          </div>
        </div>
      </div>
      <div>
        {portfolio.paymentsHistory.payments?.map((payment, idx) => (
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
                <em className="font-bold not-italic">{comma(payment.price)}</em>
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
  );
}
