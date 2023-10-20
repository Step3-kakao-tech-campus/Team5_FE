import React, { useState } from "react";
import GNBBOX from "../components/common/GNBBOX";
import MainCarousel from "../components/main/MainCarousel";
import MainHeaderRow from "../components/main/MainHeaderRow";
import SearchBar from "../components/common/SearchBar";

export default function MainPage() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const handleOpenSearchBar = () => {
    setIsSearchBarOpen(true);
  };
  const handleCloseSearchBar = () => {
    setIsSearchBarOpen(false);
  };

  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full h-full ">
        {isSearchBarOpen && (
          <SearchBar handleCloseSearchBar={handleCloseSearchBar} />
        )}
        {!isSearchBarOpen && (
          <MainHeaderRow handleOpenSearchBar={handleOpenSearchBar} />
        )}
        <MainCarousel />
      </div>
      <GNBBOX />
    </div>
  );
}
