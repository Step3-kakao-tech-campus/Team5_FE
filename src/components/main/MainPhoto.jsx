import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Photo from "../common/atoms/Photo";

const MainPhoto = ({
  className = "",
  to = "",
  src,
  alt,
  plannerName = "",
  brideName = "",
  brideInstagram = "",
}) => {
  const navigate = useNavigate();
  const [moved, setMoved] = useState(false);

  const downListener = () => {
    setMoved(false);
  };

  const moveListener = () => {
    setMoved(true);
  };

  const upListener = () => {
    if (!moved) {
      navigate(to);
    }
  };

  return (
    <div
      className={`photo-wrapper relative h-[600px] min-[576px]:h-[800px] ${className}`}
    >
      <div
        onMouseUp={() => upListener()}
        onMouseMove={moveListener}
        onMouseDown={downListener}
        role="presentation"
      >
        <Photo
          src={src}
          alt={alt}
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full">
          <div className="flex">
            <div className="mt-4 mx-auto text-white text-[60px] min-[390px]:text-[80px] min-[576px]:text-[100px] leading-none font-['Licorice']">
              Congratulations!
            </div>
          </div>
          <div className="flex">
            <div className="ml-auto mr-4 text-right text-sm text-white">
              <div>{brideName}</div>
              <div>{brideInstagram}</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-[60%] h-full w-full overflow-hidden bg-gradient-to-b from-gradient-from-sunsu to-gradient-to-sunsu">
          <div className="flex">
            <div className="mt-[195px] min-[576px]:mt-[270px] ml-8 text-sm text-white font-bold">
              <div>{plannerName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPhoto;
