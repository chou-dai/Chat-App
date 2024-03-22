import React, { Fragment, useEffect, useState } from "react";
import { auth, db } from "@/configs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useAppSelector } from "@/redux/config/hooks";
import { selectUserInfo } from "@/redux/userInfoSlice";

const Chat: React.FC = () => {
  const userInfo = useAppSelector(selectUserInfo);

  return (
    <>
      {userInfo.name}
      {userInfo.roomId}
    </>
  );
};

export default Chat;
