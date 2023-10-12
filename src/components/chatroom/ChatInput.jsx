/* eslint-disable no-unused-vars */
import ImageIcon from "@mui/icons-material/Image";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useParams } from "react-router-dom";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { chatId } = useParams();

  return (
    <Grid container sx={{ p: "20px" }}>
      <Grid item xs={12} sx={{ position: "relative" }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={() => {}}>
                  <InsertEmoticonIcon />
                </IconButton>
                <IconButton onClick={() => {}}>
                  <ImageIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={() => {}} disabled={loading}>
                  <FiSend className=" text-2xl" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="off"
          label="메세지 입력"
          fullWidth
          value={message}
          onChange={() => {}}
          onKeyDown={() => {}}
        />
      </Grid>
    </Grid>
  );
}
