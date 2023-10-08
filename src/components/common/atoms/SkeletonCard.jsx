const SkeletonCard = () => {
  return (
    <div className="border-0">
      <div className="animate-pulse">
        <div className="bg-lightgray-sunsu w-full after:pb-[100%] after:block" />
        <div className="py-[9px] px-[8px]">
          <div className="flex whitespace-nowrap">
            <div className="inline bg-lightgray-sunsu h-[16px] w-[80px] mr-auto" />
            <div className="inline bg-lightgray-sunsu h-[16px] w-[22px]" />
          </div>
          <div className="bg-lightgray-sunsu h-[30px] mt-[3px] w-full" />
          <div className="bg-lightgray-sunsu h-[14px] mt-[3px] w-[70px]" />
          <div className="bg-lightgray-sunsu h-[14px] mt-[3px] w-[45px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
