import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer, {AccountState} from "./features/account";
import transferReducer, {TransferState} from "./features/transfer";
import storage from 'redux-persist/lib/storage';
import { persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER 
} from 'redux-persist';

export interface RootState {
    account: AccountState;
    transfer: TransferState;
}

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['transfers']
};

const rootReducer = persistReducer(persistConfig, combineReducers({
    account: accountReducer,
    transfer: transferReducer
}));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistedStore = persistStore(store);