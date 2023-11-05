import cn from "classnames";
import React, { forwardRef, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { regions } from "../../utils/constants";

const SelectRegion = forwardRef(({ setLocation, location }, ref) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const handleRegion = (e) => {
    setLocation(e.target.value);
    setIsSelectOpen(false);
  };
  const handleSelectOpen = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  return (
    <div className=" relative">
      <h6 className="text-xs mb-[5px]">지역</h6>
      <button
        id="region"
        ref={ref}
        className={cn(
          "flex w-full justify-between items-center h-[50px] text-black rounded-[10px] px-[20px] py-[15px] border border-lightgray-sunsu text-sm text-left hover:border-blue-sunsu",
          { "text-gray-sunsu": location === "" },
        )}
        onClick={handleSelectOpen}
      >
        {location || "지역을 선택하세요"}
        {isSelectOpen ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
      </button>
      {isSelectOpen && (
        <ul className="w-full rounded-[10px] border border-lightgray-sunsu p-1 absolute bg-white text-xs shadow-2xl">
          {regions.map((region) => (
            <li key={region}>
              <button
                className={cn(
                  "flex items-center justify-center p-2 w-full rounded",
                  { "hover:bg-blue-50": region !== location },
                  { "bg-lightskyblue-sunsu": region === location },
                )}
                onClick={handleRegion}
                value={region}
              >
                {region}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default SelectRegion;
