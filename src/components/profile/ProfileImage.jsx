import { useState } from "react";
import { BsCamera } from "react-icons/bs";
import { useSelector } from "react-redux";
import Photo from "../common/atoms/Photo";
import ProfileImageModal from "../common/modal/ProfileImageModal";
import ProfileImageSpinner from "./ProfileImageSpinner";

export default function ProfileImage() {
  const { avatar } = useSelector((state) => state.user);
  const [imageModalOpen, setImageModalOpen] = useState(false); // 이미지 모달
  const [upLoading, setUploading] = useState(false); // 업로드 중

  const handleOpenImageModal = () => {
    setImageModalOpen(true);
  };
  const handleCloseImageModal = () => {
    setImageModalOpen(false);
  };

  return (
    <>
      <ProfileImageModal
        handleClose={handleCloseImageModal}
        open={imageModalOpen}
        setUploading={setUploading}
      />
      <div className="relative w-32 h-32">
        <Photo
          src={avatar}
          alt="avatar"
          className="object-cover object-center w-full h-full rounded-full"
        />
        {upLoading && <ProfileImageSpinner />}
        <button
          className="absolute bottom-[5%] right-[5%] w-6 h-6 p-1 rounded-full bg-zinc-100 cursor-pointer hover:bg-zinc-500 hover:text-white"
          onClick={handleOpenImageModal}
        >
          <BsCamera className="w-full h-ful" />
        </button>
      </div>
    </>
  );
}
