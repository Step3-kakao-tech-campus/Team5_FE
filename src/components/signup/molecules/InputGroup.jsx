import Input from "../atoms/Input";
import Label from "../atoms/Label";
import Box from "../atoms/Box";

const InputGroup = ({
  id,
  name,
  type,
  value,
  placeholder,
  label,
  className,
  onChange,
}) => {
  return (
    <Box className={className}>
      <div className="pb-[5px]">
        <Label htmlFor={id} className="text-xs">
          {label}
        </Label>
      </div>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="relative w-full h-[50px] rounded-[10px] px-[20px] py-[15px] border border-lightgray-sunsu text-sm bg-transparent"
      />
    </Box>
  );
};

export default InputGroup;
