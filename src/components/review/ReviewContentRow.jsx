import { ReactComponent as StarIcon } from "../../assets/star-02.svg";

const ReviewContentRow = ({ review }) => {
  return (
    <>
      <div className="flex justify-between mt-[110px] sm:mt-[80px] xs:mt-[70px] px-5">
        <div className="flex">
          {Array.from({ length: review.stars }).map((_, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <StarIcon className="w-[16px] h-[16px] mr-[1px]" key={idx} />
          ))}
        </div>
        <span className="text-sm font-bold self-end">{review.coupleName}</span>
      </div>
      <p className="px-5">{review.content}</p>
    </>
  );
};

export default ReviewContentRow;
