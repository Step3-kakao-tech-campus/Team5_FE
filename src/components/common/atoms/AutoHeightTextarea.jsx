import React, { forwardRef, useCallback, useEffect } from "react";

const AutoHeightTextarea = forwardRef(
  ({ id, name, value, placeholder, className = "", onChange }, ref) => {
    useEffect(() => {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight + 2}px`;
    }, []);

    const handleResizeHeight = useCallback(() => {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight + 2}px`;
    }, []);

    return (
      <textarea
        id={id}
        name={name}
        className={`textarea ${className}`}
        value={value}
        onChange={onChange}
        onInput={handleResizeHeight}
        placeholder={placeholder}
        ref={ref}
      />
    );
  },
);

export default AutoHeightTextarea;
