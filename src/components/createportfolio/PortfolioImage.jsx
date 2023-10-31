import React from "react";
import { BsCamera } from "react-icons/bs";
import { ReactComponent as CloseIcon } from "../../assets/close-01.svg";
import Photo from "../common/atoms/Photo";

export default function PortfolioImage({ imageItems, setImageItems }) {
  const onChangeAddFile = (e) => {
    const addedFile = e.target.files[0];
    if (addedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageItems([...imageItems, reader.result]);
      };
      reader.readAsDataURL(addedFile);
    }
  };
  const handleDeleteImage = (index) => {
    const updatedImageItems = [...imageItems];
    updatedImageItems.splice(index, 1); // 해당 항목 삭제
    setImageItems(updatedImageItems); // 이미지 배열 업데이트
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <h6 className="text-xs">
          <span>사진 |</span>
          <span className=" text-gray-sunsu"> 최대 5장</span>
        </h6>
        {imageItems.length < 5 && (
          <label htmlFor="photo" className=" cursor-pointer w-fit h-fit">
            <div className=" w-28 h-28 bg-lightgray-sunsu rounded-[10px] flex flex-col justify-center items-center gap-1 hover:border-2">
              <BsCamera size={25} />
              <span className="text-xs">사진 추가</span>
              <input
                type="file"
                className="w-0 h-0"
                id="photo"
                accept="image/jpeg, image/jpg, image/png, image/gif"
                onChange={onChangeAddFile}
              />
            </div>
          </label>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {imageItems.map((imageItem, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className="w-36 h-36 relative pt-1 pr-1 xs:w-24 xs:h-24"
          >
            <Photo
              src={imageItem}
              alt="portfolio"
              className="w-full h-full rounded-[10px] object-cover object-center"
            />
            <button
              onClick={() => handleDeleteImage(idx)}
              className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            >
              <CloseIcon className="w-2 h-2" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
