import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Button from "./atoms/Button";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function SearchBar({ handleCloseSearchBar }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const searchBarRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const onKeyDownEnter = (e) => {
    // 한글만 두 번 입력되는 문제가 발생 -> 한글은 자음과 모음의 조합으로 한 음절이 만들어지기 때문에 조합문자이고, 영어는 조합문자가 아니다.
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") {
      navigate(`/search?name=${name}`);
    }
  };

  useOnClickOutside(searchBarRef, overlayRef, handleCloseSearchBar);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div
        ref={overlayRef}
        className="modal_wrapper w-full max-w-[576px] h-full bg-black fixed opacity-50 z-40 top-[50px]"
      />
      <div
        ref={searchBarRef}
        className="header-row flex h-[50px] px-[11px] text-lg border-b border-lightgray-sunsu sticky top-0 z-40 bg-white"
      >
        <div className="flex items-center justify-between w-full px-2">
          <input
            type="text"
            ref={inputRef}
            onChange={handleOnChange}
            onKeyDown={onKeyDownEnter}
            value={name}
            className=" w-5/6 bg-zinc-100 rounded text-sm py-1 px-3 tracking-tight"
            placeholder="플래너 이름을 검색해보세요."
          />
          <Button onClick={handleCloseSearchBar}>
            <IoMdClose size={20} />
          </Button>
        </div>
      </div>
    </>
  );
}
