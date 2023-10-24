import React, { useEffect, useRef } from "react";
import { ReactComponent as CloseIcon } from "../../assets/close-02.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";

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
        className="header-row flex h-[50px] px-3 text-lg border-b border-lightgray-sunsu sticky top-0 z-40 bg-white"
      >
        <div className="flex items-center justify-between w-full pr-1">
          <div className="w-full pr-[42px]">
            <input
              type="text"
              ref={inputRef}
              onChange={handleOnChange}
              onKeyDown={onKeyDownEnter}
              value={name}
              className="w-full bg-zinc-100 rounded text-sm py-[7px] px-[10px] tracking-tight"
              placeholder="플래너 이름을 검색해보세요"
            />
          </div>
          <CloseIcon className="w-4 h-4" onClick={handleCloseSearchBar} />
        </div>
      </div>
    </>
  );
}
