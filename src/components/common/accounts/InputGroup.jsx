import React, { forwardRef } from "react";
import Box from "../atoms/Box";
import Input from "../atoms/Input";
import Label from "../atoms/Label";

const InputGroup = forwardRef(
  (
    {
      id,
      name,
      type,
      value,
      placeholder,
      label,
      className,
      onChange,
      defaultValue = "",
    },
    ref,
  ) => {
    return (
      <Box className={className}>
        <div className="pb-[5px]">
          <Label htmlFor={id} className="text-xs">
            {label}
          </Label>
        </div>
        <Input
          ref={ref} // ref를 Input 요소에 전달
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="relative w-full h-[50px] rounded-[10px] px-[20px] py-[15px] border border-lightgray-sunsu text-sm bg-transparent hover:border-blue-sunsu"
        />
      </Box>
    );
  },
);

export default InputGroup;
