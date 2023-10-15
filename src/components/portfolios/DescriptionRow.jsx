const DescriptionRow = ({ title, detail }) => {
  return (
    <div className="justify-between p-5 whitespace-pre-line">
      <div className="text-base font-bold">{title}</div>
      <div className="text-sm pt-2.5">{detail}</div>
    </div>
  );
};

export default DescriptionRow;
