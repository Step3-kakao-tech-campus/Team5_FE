import QuotationCollectTemplate from "../components/quotation/QuotationCollectTemplate";
import QuotationCollectHeader from "../components/quotation/QuotationCollectHeader";

const QuotationCollectPage = () => {
  return (
    <div className="flex w-full h-full flex-col">
      <QuotationCollectHeader />
      <QuotationCollectTemplate />
    </div>
  );
};

export default QuotationCollectPage;
