import React, { useState } from "react";
import { useSelector } from "react-redux";
import MainCarousel from "../components/main/MainCarousel";
import MainHeaderRow from "../components/main/MainHeaderRow";
import MainSearchBar from "../components/main/MainSearchBar";
import InProgressQuotationBanner from "../components/main/InProgressQuotationBanner";
import Footer from "../components/common/Footer";
import MainBestReview from "../components/main/MainBestReview";

export default function MainPage() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

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
      {userInfo.role === "couple" && <InProgressQuotationBanner />}
      <MainCarousel />
      <MainBestReview />
      <Footer />
    </div>
  );
}
