import ImageIcon from "@mui/icons-material/Image";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import {
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
} from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import {
  getDatabase,
  push,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import React, { useCallback, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../../firebase";
import ImageModal from "../common/Modal/ImageModal";

function ChatInput() {
  const { userInfo } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // 메세지 전송 여부
  const [showEmoji, setShowEmoji] = useState(false); // 이모티콘 피커
  const [imageModalOpen, setImageModalOpen] = useState(false); // 이미지 모달
  const [uploading, setUploading] = useState(false); // 이미지 업로드 여부
  const [percent, setPercent] = useState(0); // 이미지 업로드 퍼센트
  const { chatId } = useParams();

  const handleOpenImageModal = useCallback(() => {
    setImageModalOpen(true);
  }, []);
  const handleCloseImageModal = useCallback(() => {
    setImageModalOpen(false);
  }, []);

  const handleTogglePicker = useCallback(
    () => setShowEmoji((show) => !show),
    [],
  );

  const handleSelectEmoji = useCallback((e) => {
    setMessage((prev) => prev + e.emoji);
  }, []);

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const createMessage = useCallback(() => {
    return {
      timestamp: serverTimestamp(),
      user: {
        userId: userInfo.userId,
        name: userInfo.username,
      },
      content: message,
      isRead: false, // 상대방의 읽음 유무
    };
  }, [message]);

  const onClickSendMessage = useCallback(async () => {
    if (!message) return;
    setLoading(true);
    try {
      await set(
        push(ref(getDatabase(), `messages/${chatId}`)), // push시 자동으로 key값 생성(매개변수로 key값을 가짐)
        createMessage(),
      );
      setLoading(false);
      setMessage("");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [chatId, createMessage, message]);

  const onKeyDownEnter = (e) => {
    // 한글만 두 번 입력되는 문제가 발생 -> 한글은 자음과 모음의 조합으로 한 음절이 만들어지기 때문에 조합문자이고, 영어는 조합문자가 아니다.
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") {
      onClickSendMessage();
    }
  };

  return (
    <Grid container sx={{ p: "20px" }}>
      <Grid item xs={12} sx={{ position: "relative" }}>
        {showEmoji && (
          <EmojiPicker onEmojiClick={handleSelectEmoji} height={350} />
        )}
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleTogglePicker}>
                  <InsertEmoticonIcon />
                </IconButton>
                <IconButton onClick={handleOpenImageModal}>
                  <ImageIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={onClickSendMessage} disabled={loading}>
                  <FiSend className=" text-2xl" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="off"
          label="메세지 입력"
          fullWidth
          value={message}
          onChange={handleOnChange}
          onKeyDown={onKeyDownEnter}
        />
        {uploading ? (
          <Grid item xs={12} sx={{ m: "10px" }}>
            <LinearProgress variant="determinate" value={percent} />
          </Grid>
        ) : null}
        <ImageModal
          handleClose={handleCloseImageModal}
          open={imageModalOpen}
          setUploading={setUploading}
          setPercent={setPercent}
        />
      </Grid>
    </Grid>
  );
}

export default ChatInput;
