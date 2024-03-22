import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Container, Typography, Paper, List } from "@mui/material";
import { auth, db } from "@/configs/firebase";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/config/hooks";
import { selectUserInfo } from "@/redux/userInfoSlice";
import {
  collection,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import InputForm from "@/component/pages/Chat/InputForm";
import MessageItem from "@/component/pages/Chat/MessageItem";

export interface messageType {
  id: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: Timestamp;
}

const Chat: React.FC = () => {
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
      sx={{
        height: "100vh",
        paddingY: "10px",
        display: "flex",
        flexDirection: "column",
      }}
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
          background: "rgba(243, 246, 249, 0.8)",
        }}
      >
        <List>
          {messages.map((msg) => (
            <MessageItem
              message={msg}
              isOwnMessage={msg.userId === userInfo.uid}
            />
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>
      {/* メッセージ入力フォーム */}
      <InputForm />
    </Container>
  );
};

export default Chat;
