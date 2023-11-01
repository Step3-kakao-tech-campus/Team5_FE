import { confirmQuotationAll } from "../../apis/quotation";
import BottomSheet from "../common/bottomsheet/BottomSheet";
import Button from "../common/atoms/Button";

const ConfirmAllBottomSheet = ({ onClose, chatId }) => {
  const handleConfirmAll = async () => {
    try {
      const response = await confirmQuotationAll(chatId);
      console.log(response);
      if (response.success) {
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
          <span>모든 결제가 완료되었나요?</span>
          <span>확정 후에는 취소가 불가능합니다.</span>
        </div>
        <Button
          className="block w-full h-[50px] rounded-[10px] text-sm bg-lightskyblue-sunsu"
          onClick={() => {
            handleConfirmAll();
          }}
        >
          모든 결제 확정하기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default ConfirmAllBottomSheet;
