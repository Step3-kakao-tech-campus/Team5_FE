import React, { useState } from "react";
import { regions } from "../../utils/constants";

export default function FilterForm() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minPercent, setMinPercent] = useState(0);
  const [maxPercent, setMaxPercent] = useState(100);

  const [selectedRegion, setSelectedRegion] = useState("");

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleMinPriceChange = (e) => {
    console.log((e.target.value / 1000) * 100);
    setMinPrice(e.target.value);
    setMinPercent((e.target.value / 1000) * 100);
  };

  const handleMaxPriceChange = (e) => {
    console.log((e.target.value / 1000) * 100);
    setMaxPrice(e.target.value);
    setMaxPercent((e.target.value / 1000) * 100);
  };

  // console.log(minPercent, 100 - maxPercent);

  return (
    <div>
      <h2>검색 필터</h2>
      {regions.map((region) => (
        <label htmlFor={region} key={region}>
          <input
            type="radio"
            name="region"
            value={region}
            checked={selectedRegion === region}
            onChange={handleRegionChange}
            className="w-0"
          />
          {region}
        </label>
      ))}

      <div className=" relative h-2 w-80 rounded bg-zinc-300">
        <div
          className={`absolute left-[${minPercent}%] right-[${
            100 - maxPercent
          }%] h-2 rounded bg-blue-300`}
        />
      </div>
      <div className=" h-1" />
      <div className=" relative h-2 w-80 rounded bg-zinc-300">
        <div className="absolute left-[0%] right-[35%] h-2 rounded bg-blue-300" />
      </div>
      <div>
        <input
          className="w-80"
          type="range"
          id="minPrice"
          value={minPrice}
          min={0}
          max={maxPrice}
          step={10}
          onChange={handleMinPriceChange}
        />
      </div>
      <div>
        <input
          className="w-80"
          type="range"
          id="maxPrice"
          value={maxPrice}
          min={minPrice}
          max={1000}
          step={10}
          onChange={handleMaxPriceChange}
        />
      </div>
      <div>
        <label htmlFor="minPrice">최소 가격: {minPrice}</label>
        <label htmlFor="maxPrice">최대 가격: {maxPrice}</label>
      </div>
    </div>
  );
}
