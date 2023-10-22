import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../common/SearchBar";

export default function MainSearchBar({ handleCloseSearchBar }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onKeyDownEnter = (e) => {
    // 한글만 두 번 입력되는 문제가 발생 -> 한글은 자음과 모음의 조합으로 한 음절이 만들어지기 때문에 조합문자이고, 영어는 조합문자가 아니다.
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") {
      navigate(`/search?name=${name}`);
      handleCloseSearchBar();
    }
  };

  return (
    <SearchBar
      handleCloseSearchBar={handleCloseSearchBar}
      setName={setName}
      name={name}
      onKeyDownEnter={onKeyDownEnter}
    />
  );
}
