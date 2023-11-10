import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      id,
      type,
      name,
      value,
      placeholder,
      className = "",
      onChange,
      defaultValue,
    },
    ref,
  ) => {
    return (
      <input
        id={id}
        name={name}
        defaultValue={defaultValue}
        className={`input ${className}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
      />
    );
  },
);

export default Input;
