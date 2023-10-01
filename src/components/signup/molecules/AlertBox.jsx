import Box from "../atoms/Box";
import Label from "../atoms/Label";

const AlertBox = ({ id, label, className }) => {
  return (
    <Box className={className}>
      <Label htmlFor={id} className="label text-red-600">
        {label}
      </Label>
    </Box>
  );
};

export default AlertBox;
