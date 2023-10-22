import React from "react";
import SearchBar from "../common/SearchBar";

export default function PortfolioSearchBar({
  name,
  setName,
  handleCloseSearchBar,
  onKeyDownEnter,
}) {
  return (
    <SearchBar
      handleCloseSearchBar={handleCloseSearchBar}
      setName={setName}
      name={name}
      onKeyDownEnter={onKeyDownEnter}
    />
  );
}
