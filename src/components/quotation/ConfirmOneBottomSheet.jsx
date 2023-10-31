import BottomSheet from "../common/bottomsheet/BottomSheet";
import Button from "../common/atoms/Button";
import { confirmQuotationDetail } from "../../apis/quotation";

const ConfirmOneBottomSheet = ({ onClose, quotationId, chatId }) => {
  const handleConfirmOne = async () => {
    try {
      const response = await confirmQuotationDetail(quotationId, chatId);
      console.log(response);
      if (response.success) {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BottomSheet onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex flex-col tracking-tight font-bold text-lg pb-[42px]">
          <span>해당 항목의 결제가 완료되었나요?</span>
          <span>변경 후에는 취소가 불가능합니다.</span>
        </div>
        <Button
          className="block w-full h-[50px] rounded-[10px] text-sm bg-lightskyblue-sunsu"
          onClick={() => {
            handleConfirmOne();
          }}
        >
          변경하기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default ConfirmOneBottomSheet;
