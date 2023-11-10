import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../assets/add-01.svg";

export default function NoQuotationListTemplate() {
  const { userInfo } = useSelector((state) => state.user);
  const { chatId } = useParams();
  return (
    <>
      <div className="flex justify-center w-full h-full">
        <div className="pt-10 flex flex-col items-center gap-5">
          <BsExclamationTriangle size={50} />
          <div className="flex flex-col items-center">
            <span className=" text-2xl font-bold">
              작성된 견적서가 없습니다.
            </span>
            <span>
              견적서를 {userInfo.role === "planner" ? "작성해" : "요청해"}{" "}
              주세요.
            </span>
          </div>
        </div>
      </div>
      {userInfo.role === "planner" && (
        <Link
          className="absolute bottom-[79px] right-[29px] w-[130px] h-[60px] flex rounded-2xl bg-lightskyblue-sunsu text-base text-black justify-center items-center"
          to={`/quotations/create/${chatId}`}
        >
          <AddIcon className="w-4 h-4 mr-2" />
          추가하기
        </Link>
      )}
    </>
  );
}
