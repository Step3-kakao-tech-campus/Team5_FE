import { Link } from "react-router-dom";
import BottomSheet from "../bottomsheet/BottomSheet";

export default function SignupCompletionSheet({ onClose }) {
  return (
    <BottomSheet onClose={onClose}>
      <div className="flex flex-col gap-12">
        <p className=" text-lg font-semibold tracking-tight">
          회원가입이 완료되었습니다.
        </p>
        <Link
          to="/login"
          className="flex w-full h-[50px] rounded-[10px] text-sm bg-lightskyblue-sunsu text-center items-center justify-center font-medium"
        >
          로그인
        </Link>
      </div>
    </BottomSheet>
  );
}
