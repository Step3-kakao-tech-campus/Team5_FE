import { comma } from "../../utils/convert";

const PriceInfoRow = ({ priceInfo }) => {
  return (
    <div className="max-w-[260px] ml-auto text-lg">
      {priceInfo.items?.map((item) => (
        <div className="flex">
          <div className="inline text-blue-sunsu">{item.itemTitle}</div>
          <div className="inline ml-auto">
            <em className="font-bold not-italic">{comma(item.itemPrice)}</em>원
          </div>
        </div>
      ))}
      <div className="flex">
        <div className="inline text-blue-sunsu">합계</div>
        <div className="inline ml-auto">
          <em className="font-bold not-italic">
            {comma(priceInfo.totalPrice)}
          </em>
          원
        </div>
      </div>
    </div>
  );
};

export default PriceInfoRow;
