import { combineReducers, configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
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

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

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
        }).concat(thunk),
});

export const persistedStore = persistStore(store);