import QuotationItem from "./QuotationItem";

const QuotationListTemplate = ({ quotation }) => {
  return (
    <div>
      {quotation.quotations.map((quotationItem) => (
        <QuotationItem quotationItem={quotationItem} />
      ))}
    </div>
  );
};

export default QuotationListTemplate;
