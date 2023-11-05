import { BsCamera } from "react-icons/bs";
import heic2any from "heic2any";
import { ReactComponent as CloseIcon } from "../../assets/close-01.svg";
import Photo from "./atoms/Photo";

export default function ImageUploadZone({ imageItems, setImageItems }) {
  const onChangeAddFile = async (e) => {
    let addedFile = e.target.files[0];
    if (addedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageItems([...imageItems, reader.result]);
      };
      if (addedFile.name.split(".")[1].toLowerCase() === "heic") {
        const blob = addedFile;
        await heic2any({ blob, toType: "image/jpeg" })
          .then((resultBlob) => {
            addedFile = new File(
              [resultBlob],
              `${addedFile.name.split(".")[0]}.jpg`,
              {
                type: "image/jpeg",
                lastModified: new Date().getTime(),
              },
            );
            reader.readAsDataURL(addedFile);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        reader.readAsDataURL(addedFile);
      }
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImageItems = [...imageItems];
    updatedImageItems.splice(index, 1); // 해당 항목 삭제
    setImageItems(updatedImageItems); // 이미지 배열 업데이트
  };

  return (
    <>
      <div className="flex flex-col gap-[5px]">
        <h6 className="text-xs">
          <span>사진 |</span>
          <span className=" text-gray-sunsu"> 최대 5장</span>
        </h6>
      </div>
      <div className="grid w-full grid-cols-3 gap-2">
        {imageItems.map((imageItem, idx) => (
          <div
            className="relative w-full h-0"
            style={{ paddingBottom: "100%" }}
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
          >
            <Photo
              src={imageItem}
              alt="결혼 사진"
              className="absolute w-[98%] h-[98%] object-cover object-center rounded-[10px] left-0 bottom-0"
            />
            <button
              onClick={() => handleDeleteImage(idx)}
              className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            >
              <CloseIcon className="w-2 h-2" />
            </button>
          </div>
        ))}
        {imageItems.length < 5 && (
          <label
            htmlFor="photo"
            className="cursor-pointer relative w-full h-0 pb-[100%]"
          >
            <div className="absolute w-[98%] h-[98%] left-0 bottom-0 bg-lightgray-sunsu rounded-[10px] flex flex-col justify-center items-center gap-1 hover:border-2">
              <BsCamera size={25} />
              <span className="text-xs">사진 추가</span>
              <input
                type="file"
                className="w-0 h-0"
                id="photo"
                accept="image/*, image/heic"
                onChange={onChangeAddFile}
              />
            </div>
          </label>
        )}
      </div>
    </>
  );
}
