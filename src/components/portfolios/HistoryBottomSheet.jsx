import { useAtomValue } from "jotai";
import BottomSheet from "../common/BottomSheet";
import { comma } from "../../utils/convert";
import { paymentAtom } from "../../store";

const HistoryBottomSheet = ({ handler }) => {
  const payment = useAtomValue(paymentAtom);

  console.log(payment);
  return (
    <BottomSheet handler={handler}>
      <div className="">
        <div className="text-base font-bold pb-2.5">상세 내역</div>
        {payment.paymentItems?.map((paymentItem) => (
          <>
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
          </>
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
