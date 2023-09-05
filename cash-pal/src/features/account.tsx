import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Authorities {
    name: string
}

export interface AccountState {
    account_id: number;
    username: string;
    password: string;
    activated: boolean;
    balance: number;
    authorities: Authorities | null;
    token: string | null;
}

const initialStateValue: AccountState = {
    account_id: 0,
    password: "",
    username: "",
    activated: false, 
    balance: 0,
    authorities: null,
    token: null
};

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialStateValue,
    reducers: {
        login: (state, action: PayloadAction<AccountState>) => {
            state.account_id = action.payload.account_id;
            state.username = action.payload.username;
            state.password = action.payload.password;
            const token = action.payload.token;
            document.cookie = `token=${token}; path=/; Secure; HttpOnly`;
        },
        setAccountBalance: (state, action: PayloadAction<number>) => {
             state.balance = action.payload 
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setAccountId: (state, action: PayloadAction<number>) => {
            state.account_id = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setActivated: (state, action: PayloadAction<boolean>) => {
            state.activated = action.payload;
        },
        setAuthorities: (state, action: PayloadAction<string>) => {
            if(state.authorities) {
                state.authorities.name = action.payload;
            }
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const {
    setAccountBalance,
    setUsername, 
    setAccountId, 
    login, 
    setPassword, 
    setActivated, 
    setAuthorities, 
    setToken 
} = accountSlice.actions;

export default accountSlice.reducer;