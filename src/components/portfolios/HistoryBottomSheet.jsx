import { useAtomValue } from "jotai";
import { Fragment } from "react";
import { paymentAtom } from "../../store";
import { comma } from "../../utils/convert";
import BottomSheet from "../common/bottomsheet/BottomSheet";

const HistoryBottomSheet = ({ onClose }) => {
  const payment = useAtomValue(paymentAtom);
  return (
    <BottomSheet onClose={onClose}>
      <div className="">
        <div className="text-base font-bold pb-2.5">상세 내역</div>
        {payment.paymentItems?.map((paymentItem, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={idx}>
            <div className="flex items-end pt-2.5">
              <div className="inline text-blue-sunsu text-sm pr-[5px]">
                {paymentItem.paymentCompany}
              </div>
              <div className="inline text-gray-sunsu text-xs mr-auto">
                {paymentItem.paymentTitle}
              </div>
              <div className="inline">
                <em className="font-bold not-italic text-sm">
                  {comma(paymentItem.paymentPrice)}
                </em>
                원
              </div>
            </div>
            <div className="flex items-end text-xs">
              {paymentItem.paymentDescription}
            </div>
          </Fragment>
        ))}
        <div className="flex pt-5 text-sm max-w-[200px] ml-auto">
          <div className="inline">합계</div>
          <div className="inline ml-auto">
            <em className="font-bold not-italic">{comma(payment.price)}</em>원
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};

export default HistoryBottomSheet;
