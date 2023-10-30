import React, { forwardRef } from "react";

const TextareaGroup = forwardRef(
  ({ label, id, name, value, onChange, rows, maxLength }, ref) => {
    return (
      <label htmlFor={id} className="text-xs">
        {label}
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className="w-full rounded-[10px] px-[20px] py-[15px] border border-lightgray-sunsu text-sm bg-white mt-1 resize-none whitespace-pre-line hover:border-blue-sunsu"
          maxLength={maxLength}
          ref={ref} // ref를 전달
        />
      </label>
    );
  },
);

export default TextareaGroup;
