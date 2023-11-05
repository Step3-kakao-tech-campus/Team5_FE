import Slider from "@mui/material/Slider";
import React from "react";
import { BiWon } from "react-icons/bi";
import { BsDashLg } from "react-icons/bs";
import { comma } from "../../utils/convert";

export default function RangeSlider({ prices, setPrices }) {
  const handleChange = (event, newPrices) => {
    setPrices(newPrices);
  };
  const valuetext = (value) => {
    return `${value}원`;
  };
  const iOSBoxShadow =
    "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

  const marks = [
    { value: 1_000_000 },
    { value: 2_000_000 },
    { value: 3_000_000 },
    { value: 4_000_000 },
    { value: 5_000_000 },
    { value: 6_000_000 },
    { value: 7_000_000 },
    { value: 8_000_000 },
    { value: 9_000_000 },
  ];

  return (
    <div className="w-full">
      <div className="w-full px-2">
        <Slider
          getAriaLabel={() => "Price range"}
          value={prices}
          onChange={handleChange}
          valueLabelDisplay="off"
          marks={marks}
          step={1_000_000}
          min={0}
          max={10_000_000}
          getAriaValueText={valuetext}
          sx={{
            "& .MuiSlider-thumb": {
              height: 24,
              width: 24,
              backgroundColor: "#fff",
              boxShadow: iOSBoxShadow,
              "&:hover": {
                boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.5,
              backgroundColor: "#bfbfbf",
            },
          }}
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="flex items-center justify-between w-5/6 sm:w-[90%] xs:w-full">
          <div className="flex flex-col border-lightgray-sunsu border rounded-[10px] px-2 py-1">
            <div className="text-[10px] text-gray-sunsu">최저 요금</div>
            <div className="flex items-center justify-between gap-1">
              <BiWon size={16} />
              <input
                type="text"
                className="w-full bg-white text-[14px]"
                disabled
                value={comma(Math.min(...prices))}
              />
            </div>
          </div>
          <BsDashLg size={28} />
          <div className="flex flex-col border-lightgray-sunsu border rounded-[10px] px-2 py-1">
            <div className="text-[10px] text-gray-sunsu">최대 요금</div>
            <div className="flex items-center justify-between gap-1">
              <BiWon size={16} />
              <input
                type="text"
                className="w-full bg-white text-[14px]"
                disabled
                value={
                  Math.max(...prices) === 10_000_000
                    ? "10,000,000 +"
                    : comma(Math.max(...prices))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
