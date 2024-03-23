import React, { useState } from "react";
import { TextField, Box, Grid, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { doc, setDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/configs/firebase";
import { useAppSelector } from "@/redux/config/hooks";
import { selectUserInfo } from "@/redux/userInfoSlice";

const InputForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const userInfo = useAppSelector(selectUserInfo);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!title) return; // 題名は必須

    // Firestoreにメッセージを保存
    const messageDocRef = doc(
      collection(db, `rooms/${userInfo.roomId}/messages`),
    );
    const newMessage = {
      title,
      content,
      userId: userInfo.uid,
      userName: userInfo.name,
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      await setDoc(messageDocRef, newMessage);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("メッセージの送信に失敗しました", error);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-center", gap: 1 }}>
      <Grid container spacing={2} style={{ flex: 1 }}>
        <Grid item xs={12}>
          <TextField
            className="title-field"
            variant="outlined"
            label="表題"
            required
            fullWidth
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 0 }}>
          <TextField
            className="content-field"
            variant="outlined"
            label="内容"
            fullWidth
            size="small"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Grid>
      </Grid>
      <IconButton
        color="primary"
        aria-label="send message"
        onClick={handleSubmit}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default InputForm;
