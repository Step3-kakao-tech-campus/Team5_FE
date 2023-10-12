import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useSetAtom } from "jotai";
import DescriptionRow from "./DescriptionRow";
import DivideBar from "../common/atoms/DivideBar";
import PriceInfoRow from "./PriceInfoRow";
import Button from "../common/atoms/Button";
import PaymentBottomSheet from "../profile/PaymentBottomSheet";
import { comma } from "../../utils/convert";
import { ReactComponent as RightArrow } from "../../assets/right-01.svg";
import HistoryBottomSheet from "./HistoryBottomSheet";
import { paymentAtom } from "../../store";
import PortfolioCarousel from "./PortfolioCarousel";

const PortfolioDetailTemplate = ({ portfolio }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [paymentBottomSheetOpen, setPaymentBottomSheetOpen] = useState(false);
  const [historyBottomSheetOpen, setHistoryBottomSheetOpen] = useState(false);
  const setPayment = useSetAtom(paymentAtom);

  return (
    <div className="w-full h-full relative">
      {paymentBottomSheetOpen && (
        <PaymentBottomSheet handler={() => setPaymentBottomSheetOpen(false)} />
      )}
      {historyBottomSheetOpen && (
        <HistoryBottomSheet handler={() => setHistoryBottomSheetOpen(false)} />
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
                {portfolio.paymentHistory.payments?.map((payment) => (
                  <Button
                    onClick={() => {
                      setPayment(payment);
                      setHistoryBottomSheetOpen(true);
                    }}
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
    </div>
  );
};

export default PortfolioDetailTemplate;
