import React, { forwardRef, useCallback, useEffect } from "react";
import Label from "./Label";

const AutoHeightTextarea = forwardRef(
  (
    {
      id,
      name,
      rows,
      value,
      placeholder,
      className = "",
      onChange,
      label,
      maxLength,
      defaultValue = "",
    },
    ref,
  ) => {
    useEffect(() => {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight + 2}px`;
    }, []);

    const handleResizeHeight = useCallback(() => {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight + 2}px`;
    }, []);

    return (
      <Label htmlFor={id} className="text-xs">
        {label}
        <textarea
          id={id}
          rows={rows}
          maxLength={maxLength}
          name={name}
          className={`textarea w-full rounded-[10px] px-[20px] py-[15px] mt-[5px] border border-lightgray-sunsu text-sm bg-transparent overflow-hidden resize-none ${className} hover:border-blue-sunsu`}
          value={value}
          onChange={onChange}
          onInput={handleResizeHeight}
          placeholder={placeholder}
          defaultValue={defaultValue}
          ref={ref}
        />
      </Label>
    );
  },
);

export default AutoHeightTextarea;
