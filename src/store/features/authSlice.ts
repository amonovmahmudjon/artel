import { type PayloadAction,createSlice } from "@reduxjs/toolkit";

interface User {
    userName: string;
}

interface AuthState {
    user: User | null;
    token: string | null
}

interface LoginPayload {
    user: User;
    token: string;
}
const savedUser = localStorage.getItem("login")
const initialState:AuthState = savedUser ? JSON.parse(savedUser) : {user:null, token:null}

const authSlice = createSlice({
    name: "account",
    initialState,
    reducers:{ 
        login: (state, action: PayloadAction<LoginPayload>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("login", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("login");
    },
  },
}); 

export const {login, logout} = authSlice.actions
export default authSlice.reducer