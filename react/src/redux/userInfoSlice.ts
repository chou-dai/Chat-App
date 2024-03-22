// https://qiita.com/ryocha12/items/76acbf02e9e73bb0c5ec 参考
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./config/store";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/configs/firebase";

export interface UserInfo {
    uid: string;
    name: string;
    email: string;
    roomId: string;
}

const initialState: UserInfo = {
    uid: "",
    name: "",
    email: "",
    roomId: "",
};

// Reduxにデータを保存するための関数（各コンポーネントからdispatchで呼び出し）
export const getUserInfoAsync = createAsyncThunk("getUserInfo", async (uid: string) => {
    const userRef = doc(db, 'users', uid);
    const documentSnapshot = await getDoc(userRef);
    const userInfo = documentSnapshot.data() as UserInfo;
    userInfo.uid = uid;
    return userInfo;
});


export const userInfoSlice = createSlice({
    name: "getUserInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfoAsync.fulfilled, (state, action) => {
                return (state = {
                    ...action.payload,
                });
            })
            .addCase(getUserInfoAsync.rejected, () => {
                alert("ユーザーの取得に失敗しました。");
            });
    }
});

// セレクター：コンポーネントから呼び出して団体情報を取得
export const selectUserInfo = (state: RootState) => state.userInfo;
export default userInfoSlice.reducer;