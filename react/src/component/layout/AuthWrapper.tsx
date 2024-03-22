import React, { FC,  memo,  ReactNode, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import { Button } from '@mui/material';

type Props = {
    children: ReactNode;
}

const AuthWrapper: FC<Props> = memo(function authWrapper({children}: Props) {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();
    const pathname = location.pathname;

    useEffect(() => {
        auth.onAuthStateChanged(async(account) => {
            // 認証されている時
            if (account) {
                setIsAuth(true);
                // ログイン画面かサインアップ画面の時はホーム画面に遷移
                if (pathname.includes("login") || pathname.includes("signup")) navigate("/");
            }
            // 認証されていない時
            else {
                setIsAuth(false);
                // ログイン画面かサインアップ画面にいる場合はそのまま
                if (pathname.includes("login") || pathname.includes("signup")) return;
                // loginページへリダイレクト
                navigate("/login");
            }
        });
    }, []);

    const handleLogout = () => {
        auth.signOut()
        .then(() => navigate("/login"))
        .catch((error) => alert(error.message));
    }

    return (
        <div className="min-h-screen min-w-full flex flex-col items-center">
            <div className="flex-1 flex justify-center pt-32">
                {isAuth && (
                    <Button variant="contained" color="primary" onClick={handleLogout}>
                        ログアウト
                    </Button>
                )}
                {(children)}
            </div>
        </div>
    );
});

export default AuthWrapper;