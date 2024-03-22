import React, { FC, memo, ReactNode, useEffect } from "react";
import { auth } from "@/configs/firebase";
import { useNavigate } from "react-router";
import { getUserInfoAsync } from "@/redux/userInfoSlice";
import { useAppDispatch } from "@/redux/config/hooks";

type Props = {
  children: ReactNode;
};

const AuthWrapper: FC<Props> = memo(function authWrapper({ children }: Props) {
  const navigate = useNavigate();
  const pathname = location.pathname;
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (account) => {
      // 認証されている時
      if (account) {
        dispatch(getUserInfoAsync(account.uid));
        // ログイン画面かサインアップ画面の時はホーム画面に遷移
        if (pathname.includes("login") || pathname.includes("signup"))
          navigate("/");
      }
      // 認証されていない時
      else {
        // ログイン画面かサインアップ画面にいる場合はそのまま
        if (pathname.includes("login") || pathname.includes("signup")) return;
        navigate("/login");
      }
    });
  }, []);

  return <div className="min-h-screen">{children}</div>;
});

export default AuthWrapper;
