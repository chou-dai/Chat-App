import React, { Fragment, useState } from "react";
import { auth } from "@/firebase/index";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Box, Button, Container, Grid, TextField } from "@mui/material";

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const Register = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        alert("サインアップ完了");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Fragment>
      <Container>
        <Grid container>
          <Grid item md={4}></Grid>
          <Grid item md={4}>
            <Grid item md={4}>
              サインアップ
            </Grid>
            <Box component="form">
              <TextField
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                name="email"
                label="E-mail"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
              <TextField
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                name="password"
                label="Password"
                fullWidth
                variant="outlined"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
              <Button
                fullWidth
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                onClick={Register}
              >
                新規登録
              </Button>
            </Box>
          </Grid>
          <Grid item md={4}></Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Auth;
