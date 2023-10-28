import React, { useState } from "react";
import MainCarousel from "../components/main/MainCarousel";
import MainHeaderRow from "../components/main/MainHeaderRow";
import MainSearchBar from "../components/main/MainSearchBar";

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
      {isSearchBarOpen && (
        <MainSearchBar handleCloseSearchBar={handleCloseSearchBar} />
      )}
      {!isSearchBarOpen && (
        <MainHeaderRow handleOpenSearchBar={handleOpenSearchBar} />
      )}
      <MainCarousel />
    </div>
  );
}
