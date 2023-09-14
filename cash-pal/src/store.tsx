import { configureStore } from "@reduxjs/toolkit";
import accountReducer, {AccountState} from "./features/account";
import transferReducer, {TransferState} from "./features/transfer";

export interface RootState {
    account: AccountState;
    transfer: TransferState;
}

const store = configureStore({
    reducer: {
        account: accountReducer,
        transfer: transferReducer
    },
});

export default store;