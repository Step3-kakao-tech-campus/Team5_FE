import cn from "classnames";
import React, { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { regions } from "../../utils/constants";
import RangeSlider from "./RangeSlider";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function FilterForm({
  selectedRegion,
  setSelectedRegion,
  prices,
  setPrices,
  handleFilterForm,
  setQueryLocation,
  setQueryMinPrice,
  setQueryMaxPrice,
}) {
  const filterFormRef = useRef(null);
  const overlayRef = useRef(null);

  const handleResetFilter = () => {
    setSelectedRegion(null);
    setPrices([0, 10_000_000]);
  };
  const handleApplyFilter = () => {
    setQueryLocation(selectedRegion);
    // eslint-disable-next-line prefer-destructuring
    setQueryMinPrice(prices[0]);
    if (prices[1] === 10_000_000) {
      setQueryMaxPrice(null);
      handleFilterForm();
      return;
    }
    // eslint-disable-next-line prefer-destructuring
    setQueryMaxPrice(prices[1]);
    handleFilterForm();
  };

  const handleRegionChange = (event) => {
    if (selectedRegion === event.target.value) {
      setSelectedRegion(null);
      return;
    }
    setSelectedRegion(event.target.value);
  };

  useOnClickOutside(filterFormRef, overlayRef, handleFilterForm);

  return (
    <>
      <div
        className="overlay w-full max-w-[576px] h-full bg-black fixed opacity-50 z-40 top-[50px]"
        ref={overlayRef}
      />
      <div
        className="flex flex-col p-4 gap-4 fixed top-[50px] max-w-[576px] w-full bg-white z-40"
        ref={filterFormRef}
      >
        <div>
          <h4 className="text-xs text-gray-sunsu pb-1">지역</h4>
          <div className=" grid grid-cols-2 text-[14px] gap-2">
            {regions.map((region) => (
              <label
                htmlFor={region}
                key={region}
                className={cn(
                  " hover:underline cursor-pointer w-fit flex items-center",
                  {
                    "text-blue-sunsu": selectedRegion === region,
                  },
                )}
              >
                <input
                  id={region}
                  type="radio"
                  name="region"
                  value={region}
                  onClick={handleRegionChange}
                  className="w-0"
                />
                {region}
                {selectedRegion === region && (
                  <AiOutlineClose size={14} className=" text-blue-sunsu" />
                )}
              </label>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs text-gray-sunsu mb-1">가격</h4>
          <RangeSlider prices={prices} setPrices={setPrices} />
        </div>

        <div className="w-full flex items-center gap-3">
          <button
            className=" bg-lightgray-sunsu rounded-[10px] w-full h-[32px]"
            onClick={handleResetFilter}
          >
            필터 초기화
          </button>
          <button
            className=" rounded-[10px] w-full h-[32px] text-white bg-blue-sunsu"
            onClick={handleApplyFilter}
          >
            적용
          </button>
        </div>
      </div>
    </>
  );
}
