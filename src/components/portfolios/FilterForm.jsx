import cn from "classnames";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { regions } from "../../utils/constants";
import RangeSlider from "./RangeSlider";

export default function FilterForm({
  selectedRegion,
  setSelectedRegion,
  prices,
  setPrices,
}) {
  const handleRegionChange = (event) => {
    if (selectedRegion === event.target.value) {
      setSelectedRegion(null);
      return;
    }
    setSelectedRegion(event.target.value);
  };

  return (
    <>
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
    </>
  );
}
