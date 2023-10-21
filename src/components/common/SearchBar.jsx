import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Button from "./atoms/Button";

export default function SearchBar({
  handleCloseSearchBar,
  setName,
  name,
  onKeyDownEnter,
}) {
  const inputRef = useRef(null);
  const searchBarRef = useRef(null);
  const overlayRef = useRef(null);

  const handleOnChange = (e) => {
    setName(e.target.value);
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
