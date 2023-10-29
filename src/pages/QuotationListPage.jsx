import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect } from "react";
import QuotationListTemplate from "../components/quotation/QuotationListTemplate";
import Spinner from "../components/common/atoms/Spinner";
import { getQuotationList } from "../apis/quotation";
import QuotationListHeader from "../components/quotation/QuotationListHeader";

const QuotationListPage = () => {
  const { chatId } = useParams();
  const { data, error, isLoading } = useQuery(
    `/quotations?chatId=${chatId}`,
    () => getQuotationList(chatId),
  );
  const quotation = data?.response;

  useEffect(() => {
    if (error) {
      console.error(error.message);
      alert("서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
    }
  }, [error]);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex w-full h-full flex-col">
      <QuotationListHeader />
      {quotation && <QuotationListTemplate quotation={quotation} />}
    </div>
  );
};

export default QuotationListPage;
