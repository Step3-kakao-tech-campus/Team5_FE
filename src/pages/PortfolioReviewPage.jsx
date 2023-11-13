import React from "react";
import PortfolioReviewHeader from "../components/review/PortfolioReviewHeader";
import PortfolioReviewTemplate from "../components/review/PortfolioReviewTemplate";

export default function PortfolioReviewPage() {
  return (
    <div className="w-full h-full">
      <PortfolioReviewHeader />
      <PortfolioReviewTemplate />
    </div>
  );
}
