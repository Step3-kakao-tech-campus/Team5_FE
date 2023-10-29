import { comma } from "../../utils/convert";

const QuotationItem = ({ quotationItem }) => {
  return (
    <div className="pt-[30px] px-[29px]">
      <div className="flex">
        <span className="text-base text-blue-sunsu">
          {quotationItem.company}
        </span>
        <span className="mr-auto ml-[4px] mt-[4px] text-xs text-gray-sunsu">
          {"| "}
          {quotationItem.title}
        </span>
        <span className="text-base font-bold">
          {comma(quotationItem.price)}
        </span>
        <span className="text-base">원</span>
      </div>
      <div className="pt-[5px] text-sm">{quotationItem.description}</div>
      <div className="pt-[5px] text-xs text-gray-sunsu">
        {quotationItem.status === "완료" ? (
          <span>결제완료</span>
        ) : (
          <span>결제미완료 | 결제완료로 변경</span>
        )}
      </div>
      <div className="pt-[2px] text-xs text-gray-sunsu">
        <span>최종 수정일 {quotationItem.modifiedAt}</span>
        {quotationItem.status === "미완료" && <span> | 수정하기</span>}
      </div>
    </div>
  );
};

export default QuotationItem;
