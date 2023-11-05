import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import { getDatabase, ref, set } from "firebase/database";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref as refStorage,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "../../../firebase";
import { updateAvatar } from "../../../store/slices/userSlice";
import { defaultAvatarUrl } from "../../../utils/constants";

function ProfileImageModal({ open, handleClose, setUploading }) {
  const { userInfo, avatar } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const onChangeAddFile = useCallback((e) => {
    const addedFile = e.target.files[0];
    if (addedFile) setFile(addedFile);
  }, []);

  const uploadFile = useCallback(() => {
    setUploading(true);
    const filePath = `users/${userInfo.userId}/${uuidv4()}.${file.name
      .split(".")
      .pop()}`; // uuidv4()는 랜덤한 문자열을 생성해준다., 마지막에 확장자를 붙여준다.
    const uploadTask = uploadBytesResumable(
      refStorage(getStorage(), filePath),
      file,
    ); // 파일을 storage에 업로드
    const unsubscribe = uploadTask.on(
      // 이벤트 리스너를 등록
      "state_changed",
      () => {},
      (error) => {
        console.error(error);
        setUploading(false);
      },
      // 업로드 완료시
      async () => {
        try {
          // 업로드한 파일의 다운로드 URL을 가져온다.
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          // 메세지를 보내는 과정
          await set(
            ref(getDatabase(), `users/${userInfo.userId}/avatar`),
            downloadUrl,
          );
          dispatch(updateAvatar(downloadUrl));
          setUploading(false);
          unsubscribe();
        } catch (error) {
          console.error(error);
          setUploading(false);
          unsubscribe();
        }
      },
    );
  }, [file, setUploading, userInfo.userId]);

  const handleSendFile = useCallback(() => {
    if (!file) {
      handleClose();
      return;
    }
    uploadFile();
    handleClose();
    setFile(null);
  }, [file, handleClose, uploadFile]);

  const handleDeleteFile = useCallback(async () => {
    if (avatar === defaultAvatarUrl) {
      handleClose();
      return;
    }
    setUploading(true);
    try {
      await set(
        ref(getDatabase(), `users/${userInfo.userId}/avatar`),
        defaultAvatarUrl,
      );
      // URL 객체 생성
      const parsedURL = new URL(avatar);
      // 파일 이름 추출
      const pathSegments = parsedURL.pathname.split("/");
      const encodedFileName = pathSegments[pathSegments.length - 1];
      const decodedFileName = decodeURIComponent(encodedFileName);
      console.log(decodedFileName);
      await deleteObject(refStorage(getStorage(), decodedFileName));
      dispatch(updateAvatar(defaultAvatarUrl));
    } catch (error) {
      console.error(error);
    }
    handleClose();
    setUploading(false);
  }, [file, handleClose, uploadFile]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>프로필 이미지 설정</DialogTitle>
      <DialogContent>
        <Input
          margin="dense"
          inputProps={{ accept: "image/jpeg, image/jpg, image/png, image/gif" }} // 이미지 파일 형식
          type="file"
          fullWidth
          variant="standard"
          onChange={onChangeAddFile}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          취소
        </Button>
        <Button onClick={handleSendFile}>등록</Button>
        <Button onClick={handleDeleteFile} color="error">
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProfileImageModal;
