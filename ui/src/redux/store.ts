import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']//slice ka naam jiska data persist krna h
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
})

export const persistor: any = persistStore(store)