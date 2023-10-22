import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import bottomSheetReducer from "./slices/bottomSheetSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  bottomSheet: bottomSheetReducer,
});

const persistConfig = {
  key: "root",
  storage, // local storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export * from "./atoms";
