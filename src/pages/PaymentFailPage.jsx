import React from "react";
import { useNavigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";

export default function PaymentFailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paymentFailMessage = searchParams.get("message");

  return (
    <div className="flex flex-col tracking-tight w-full h-[calc(100vh-50px)]">
      <div className=" grow p-10 flex justify-between flex-col">
        <div>
          <h1 className=" text-2xl font-medium pt-10">
            결제를 <span className=" text-red-500">실패했습니다.</span>
          </h1>
          <h3 className=" tracking-tighter text-sm flex flex-col pt-5 pb-1 font-medium">
            실패 사유를 확인하신 후 재시도를 눌러주세요.
          </h3>
          <div className=" bg-zinc-100 text-sm w-full p-3 text-center rounded-lg">
            {paymentFailMessage}
          </div>
        </div>
        <div className=" flex justify-center gap-3 font-medium text-sm text-center pb-10">
          <button
            onClick={() => navigate(-1)}
            className=" w-1/2 bg-white text-black rounded-md py-2 px-4 border border-solid hover:bg-zinc-200"
          >
            이전으로
          </button>
          <Link
            className="w-1/2 bg-red-sunsu text-white rounded-md py-2 px-4 hover:bg-[#bf3a30]"
            to="/"
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
