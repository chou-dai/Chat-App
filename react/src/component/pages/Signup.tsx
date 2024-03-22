import React, { useState } from "react";
import { auth, db } from "@/configs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Signup: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateRoomId = async (roomId: string) => {
    const roomRef = doc(db, 'rooms', roomId);
    const documentSnapshot = await getDoc(roomRef);
    return documentSnapshot.exists();
  };

  const handleSubmit = async () => {
    const isRoomValid = await validateRoomId(roomId);
    console.log(isRoomValid);
    
    if (!isRoomValid) {
      alert('無効なRoom IDです。');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        const userId = user.uid;
        const userDocumentRef = doc(db, 'users', userId);
        await setDoc(userDocumentRef, {
          roomId,
          name,
          email
        });
        alert('登録が完了しました。');
      }
    } catch (error) {
      alert('アカウントの作成に失敗しました。');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          サインアップ
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="roomId"
                label="Room ID"
                name="roomId"
                autoComplete="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="名前"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            サインアップ
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
