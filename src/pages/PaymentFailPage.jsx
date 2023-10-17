import React, { useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link, useSearchParams } from "react-router-dom";

export default function PaymentFailPage() {
  const [searchParams] = useSearchParams();
  const paymentFailMessage = searchParams.get("message");
  useEffect(() => {
    console.log("paymentFailMessage", paymentFailMessage);
  }, []);

  return (
    <div className="flex flex-col items-center tracking-tight gap-10">
      <div className=" text-center">
        <h1 className=" text-2xl font-medium pt-36">
          결제를 <span className=" text-red-500">실패했습니다.</span>
        </h1>
        <h3 className=" tracking-tighter">
          실패 사유를 확인하신 후 재시도를 눌러주세요.
        </h3>
      </div>
      <div className=" bg-zinc-200 text-sm w-2/3 p-3 text-center rounded-sm">
        {paymentFailMessage}
      </div>
      <Link
        className=" bg-red-sunsu text-white p-2 px-4 rounded flex items-center gap-1"
        to="/"
      >
        <span>홈으로</span>
        <span>
          <AiOutlineRight size={18} />
        </span>
      </Link>
    </div>
  );
}
