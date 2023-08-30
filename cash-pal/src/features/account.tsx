import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccountState {
    balance: number;
}

const initialStateValue: AccountState = {
    balance: 100
};

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialStateValue,
    reducers: {
        setAccountBalance: (state, action: PayloadAction<number>) => { state.balance = action.payload }
    }
});

export const {setAccountBalance} = accountSlice.actions;

export default accountSlice.reducer;