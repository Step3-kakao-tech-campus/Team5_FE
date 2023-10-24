import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import {
  getDatabase,
  push,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as refStorage,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../../../firebase";

function ImageModal({ open, handleClose, setPercent, setUploading }) {
  const { userInfo } = useSelector((state) => state.user);
  const { chatId } = useParams();
  const [file, setFile] = useState(null); // file을 state로 관리

  const onChangeAddFile = useCallback((e) => {
    const addedFile = e.target.files[0];
    if (addedFile) setFile(addedFile);
  }, []);

  const createImageMessage = useCallback(
    (fileUrl, fileName) => ({
      timestamp: serverTimestamp(),
      user: {
        userId: userInfo.userId,
        name: userInfo.username,
      },
      content: fileName,
      isRead: false, // 상대방의 읽음 유무
      image: fileUrl,
    }),
    [],
  );

  const uploadFile = useCallback(() => {
    setUploading(true);
    const filePath = `chat/${uuidv4()}.${file.name.split(".").pop()}`; // uuidv4()는 랜덤한 문자열을 생성해준다., 마지막에 확장자를 붙여준다.
    const uploadTask = uploadBytesResumable(
      refStorage(getStorage(), filePath),
      file,
    ); // 파일을 storage에 업로드
    const unsubscribe = uploadTask.on(
      // 이벤트 리스너를 등록
      "state_changed",
      (snap) => {
        const percentUploaded = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100,
        );
        setPercent(percentUploaded);
      },
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
            push(ref(getDatabase(), `messages/${chatId}`)),
            createImageMessage(downloadUrl, file.name),
          );
          setUploading(false);
          unsubscribe();
        } catch (error) {
          console.error(error);
          setUploading(false);
          unsubscribe();
        }
      },
    );
  }, [chatId, createImageMessage, file, setPercent, setUploading]);

  const handleSendFile = useCallback(() => {
    if (!file) {
      handleClose();
      return;
    }
    uploadFile();
    handleClose();
    setFile(null);
  }, [file, handleClose, uploadFile]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>이미지 보내기</DialogTitle>
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
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleSendFile}>전송</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageModal;
