import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";
import authApi from "./services/authApi";

//persit our store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk"; // => enable async actions

//reducers
const reducer = combineReducers({
    user: userSlice,
    products: productSlice,
    [appApi.reducerPath]: appApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blackList: [appApi.reducerPath, "products"], //array of keys that should not be persisted
};

// persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

// creating the store

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([thunk, appApi.middleware, authApi.middleware]), // add authApi middleware
});

export default store;