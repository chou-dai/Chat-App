import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { auth, db } from "@/configs/firebase";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/config/hooks";
import { selectUserInfo } from "@/redux/userInfoSlice";
import {
  doc,
  setDoc,
  collection,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

type messageType = {
  id: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: Timestamp;
};

const Chat: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<messageType[]>([]);
  const navigate = useNavigate();
  const userInfo = useAppSelector(selectUserInfo);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (!userInfo.roomId) return;

    const messagesRef = collection(db, `rooms/${userInfo.roomId}/messages`);
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as messageType,
      );
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [userInfo.roomId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      // UI上のメッセージリストを更新 (オプショナル、リアルタイム更新の場合は不要)
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...newMessage, id: messageDocRef.id },
      ]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("メッセージの送信に失敗しました", error);
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => navigate("/login"))
      .catch((error) => alert(error.message));
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* ヘッダ */}
      <Box
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">チャットアプリ</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          ログアウト
        </Button>
      </Box>
      {/* ユーザー情報 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="subtitle1">ユーザー名: {userInfo.name}</Typography>
        <Typography variant="subtitle1">ルームID: {userInfo.roomId}</Typography>
      </Box>
      {/* メッセージリスト */}
      <Paper
        style={{
          flex: 1,
          overflow: "auto",
          marginBottom: "8px",
          padding: "8px",
        }}
      >
        <List>
          {messages.map((msg) => (
            <ListItem key={msg.id}>
              <ListItemText primary={msg.title} secondary={msg.content} />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>
      {/* メッセージ入力フォーム */}
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
        <TextField
          variant="outlined"
          label="題名"
          required
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="詳細"
          fullWidth
          multiline
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          送信
        </Button>
      </Box>
    </Container>
  );
};

export default Chat;
