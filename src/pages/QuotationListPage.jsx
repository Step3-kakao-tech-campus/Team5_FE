import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getQuotationList } from "../apis/quotation";
import Spinner from "../components/common/atoms/Spinner";
import QuotationListHeader from "../components/quotation/QuotationListHeader";
import QuotationListTemplate from "../components/quotation/QuotationListTemplate";
import useDefaultErrorHandler from "../hooks/useDefaultErrorHandler";

const QuotationListPage = () => {
  const { chatId } = useParams();
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const { data: quotation, isLoading } = useQuery(
    `/quotations?chatId=${chatId}`,
    () => getQuotationList(chatId),
    {
      keepPreviousData: true,
      onError: (error) => {
        console.log(error);
        defaultErrorHandler(error);
      },
    },
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="flex w-full h-full flex-col">
      <QuotationListHeader />
      {quotation && <QuotationListTemplate quotation={quotation} />}
    </div>
  );
};

export default QuotationListPage;
