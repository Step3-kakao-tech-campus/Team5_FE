const Input = ({
  id,
  type,
  name,
  value,
  placeholder,
  className = "",
  onChange,
}) => {
  return (
    <input
      id={id}
      name={name}
      className={`input ${className}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
