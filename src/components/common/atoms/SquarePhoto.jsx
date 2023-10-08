import Photo from "./Photo";

const SquarePhoto = ({ className = "", src, alt }) => {
  return (
    <div
      className={`photo-wrapper relative after:pb-[100%] after:block ${className}`}
    >
      <Photo
        src={src}
        alt={alt}
        className="absolute w-full h-full object-cover"
      />
    </div>
  );
};

export default SquarePhoto;
