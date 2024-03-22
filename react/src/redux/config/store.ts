import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import userInfoReducer from "../userInfoSlice";

// ReduxのStore
const store = configureStore({
    reducer: {
        // ここに保存！！
        userInfo: userInfoReducer
    }
});

// Storeの型定義
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;