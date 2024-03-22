import React from "react";
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
