import cn from "classnames";
import React, { useState } from "react";
import { BsCamera, BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { regions } from "../../utils/constants";
import Button from "../common/atoms/Button";

export default function CreatePortfolioTemplate() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const handleSelectOpen = () => {
    setIsSelectOpen(!isSelectOpen);
  };
  return (
    <div className="w-full h-full flex flex-col p-7 gap-5">
      {/* 이름 */}
      <label htmlFor="title" className=" text-xs">
        이름
        <input
          type="text"
          id="title"
          className="w-full h-[50px] rounded-[10px] px-[20px] py-[15px] border border-lightgray-sunsu text-sm bg-white mt-1"
          disabled
          value={userInfo.username}
        />
      </label>
      {/* 지역 */}
      <div className=" relative">
        <h6 className="text-xs mb-1">지역</h6>
        <button
          id="region"
          className={cn(
            "flex w-full justify-between items-center h-[50px] text-zinc-500 rounded-[10px] px-[20px] py-[15px] border border-lightgray-sunsu text-sm text-left hover:border-blue-sunsu",
          )}
          onClick={handleSelectOpen}
        >
          지역을 선택하세요
          <BsChevronDown size={20} />
          {/* <BsChevronUp /> */}
        </button>
        {isSelectOpen && (
          <ul className="w-full rounded-[10px] border border-lightgray-sunsu p-1 absolute bg-white text-xs shadow-2xl">
            {regions.map((region) => (
              <li
                key={region}
                className="flex items-center justify-center p-2 cursor-pointer hover:bg-blue-50"
              >
                {region}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* 가격 */}
      <div className="flex flex-col gap-1">
        <h6 className="text-xs">가격</h6>
        <div
          type="text"
          id="price"
          className="flex justify-between w-full h-[50px] rounded-[10px] px-[20px] py-[10px] border border-lightgray-sunsu text-sm hover:border-blue-sunsu"
        >
          <input type="text" className="border w-full" placeholder="항목" />
          <input
            type="text"
            className="border text-right font-bold w-full"
            placeholder="0원"
          />
        </div>
        <button className="w-full h-[50px] rounded-[10px] px-[20px] py-[15px] border border-lightgray-sunsu text-sm">
          항목 추가하기
        </button>
      </div>
      {/* 한 줄 소개 */}
      <label htmlFor="oneline" className=" text-xs">
        한 줄 소개
        <textarea
          id="oneline"
          rows={3}
          className="w-full rounded-[10px] px-[20px] py-[15px] border border-lightgray-sunsu text-sm bg-white mt-1 resize-none hover:border-blue-sunsu"
          maxLength={120}
        />
      </label>
      {/* 소개 */}
      <label htmlFor="description" className=" text-xs">
        소개
        <textarea
          id="description"
          rows={8}
          className="w-full rounded-[10px] px-[20px] py-[15px] border border-lightgray-sunsu text-sm bg-white mt-1 resize-none hover:border-blue-sunsu"
        />
      </label>
      {/* 경력 */}
      <label htmlFor="career" className=" text-xs">
        경력
        <textarea
          id="career"
          rows={3}
          className="w-full rounded-[10px] px-[20px] py-[15px] border border-lightgray-sunsu text-sm bg-white mt-1 resize-none hover:border-blue-sunsu"
        />
      </label>
      {/* 주요 제휴 업체 */}
      <label htmlFor="company" className=" text-xs">
        주요 제휴 업체
        <textarea
          id="company"
          rows={3}
          className="w-full rounded-[10px] px-[20px] py-[15px] border border-lightgray-sunsu text-sm bg-white mt-1 resize-none hover:border-blue-sunsu"
        />
      </label>
      {/* 사진 */}
      <div className="flex flex-col gap-1">
        <h6 className="text-xs">
          <span>사진 |</span>
          <span className=" text-gray-sunsu"> 최대 5장</span>
        </h6>
        <label htmlFor="photo" className=" cursor-pointer w-fit h-fit">
          <div className=" w-28 h-28 bg-lightgray-sunsu rounded-[10px] flex flex-col justify-center items-center gap-1">
            <BsCamera size={25} />
            <span className="text-xs">사진 추가</span>
          </div>
          <input type="file" className="w-0 h-0" id="photo" />
        </label>
      </div>
      <Button
        // onClick={handleLogin}
        // disabled={isSubmitting}
        className="block w-full h-[50px] rounded-[10px] font-normal text-sm bg-[#A7CFFF]"
      >
        저장하기
      </Button>
    </div>
  );
}
