import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ id, type, name, value, placeholder, className = "", onChange }, ref) => {
    return (
      <input
        id={id}
        name={name}
        className={`input ${className}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
      />
    );
  }
);

export default Input;
