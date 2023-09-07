import { configureStore } from "@reduxjs/toolkit";
import accountReducer, {AccountState} from "./features/account";

export interface RootState {
    account: AccountState;
}

const store = configureStore({
    reducer: {
        account: accountReducer,
    },
});

export default store;