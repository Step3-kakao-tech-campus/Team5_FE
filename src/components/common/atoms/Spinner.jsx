import { ReactComponent as SpinnerIcon } from "../../../assets/spinner-01.svg";

const Spinner = () => {
  return (
    <div className="absolute top-[calc(50%-60px)] left-[calc(50%-60px)]">
      <SpinnerIcon />
    </div>
  );
};

export default Spinner;
