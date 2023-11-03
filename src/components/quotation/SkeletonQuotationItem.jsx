const SkeletonQuotationItem = () => {
  return (
    <div className="border-0">
      <div className="animate-pulse">
        <div className="py-[24px] mx-[29px] border-b border-lightgray-sunsu">
          <div className="flex whitespace-nowrap">
            <div className="inline bg-lightgray-sunsu h-[24px] w-[170px] mr-auto" />
            <div className="inline bg-lightgray-sunsu h-[18px] w-[88px]" />
          </div>

          <div className="flex whitespace-nowrap mt-[15px]">
            <div className="inline bg-lightgray-sunsu h-[24px] w-[140px] mr-auto" />
            <div className="inline bg-lightgray-sunsu h-[24px] w-[100px]" />
          </div>
          <div className="bg-lightgray-sunsu h-[20px] mt-[5px] w-full" />
          <div className="bg-lightgray-sunsu h-[14px] mt-[5px] w-[70px]" />
          <div className="bg-lightgray-sunsu h-[14px] mt-[5px] w-[130px]" />

          <div className="flex whitespace-nowrap mt-[15px]">
            <div className="inline bg-lightgray-sunsu h-[24px] w-[140px] mr-auto" />
            <div className="inline bg-lightgray-sunsu h-[24px] w-[100px]" />
          </div>
          <div className="bg-lightgray-sunsu h-[20px] mt-[5px] w-full" />
          <div className="bg-lightgray-sunsu h-[14px] mt-[5px] w-[70px]" />
          <div className="bg-lightgray-sunsu h-[14px] mt-[5px] w-[130px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonQuotationItem;
