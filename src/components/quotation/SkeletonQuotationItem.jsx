const SkeletonQuotationItem = () => {
  return (
    <div className="border-0">
      <div className="animate-pulse">
        <div className="py-[15px] mx-[29px] border-b border-lightgray-sunsu">
          <div className="bg-lightgray-sunsu h-[14px] w-[80px] mr-auto" />
          <div className="flex whitespace-nowrap mt-[3px]">
            <div className="inline bg-lightgray-sunsu h-[24px] w-[160px] mr-auto" />
            <div className="inline bg-lightgray-sunsu h-[24px] w-[100px]" />
          </div>
          <div className="bg-lightgray-sunsu h-[20px] mt-[3px] w-full" />
          <div className="bg-lightgray-sunsu h-[14px] mt-[3px] w-[70px]" />
          <div className="bg-lightgray-sunsu h-[14px] mt-[3px] w-[130px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonQuotationItem;
