import { Link } from "react-router-dom";
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
  return (
    <div
      className={`photo-wrapper relative h-[600px] min-[576px]:h-[800px] ${className}`}
    >
      <Link to={to}>
        <Photo
          src={src}
          alt={alt}
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 top-[60%] h-full w-full overflow-hidden bg-gradient-to-b from-gradient-from-sunsu to-gradient-to-sunsu">
          <div className="mt-[130px] min-[576px]:mt-[200px] ml-[30px] text-white">
            <div className="font-bold text-sm">{plannerName}</div>
            <div>
              <div className="inline font-bold text-lg">{brideName}</div>
              <div className="inline text-xs ml-1">{brideInstagram}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MainPhoto;
