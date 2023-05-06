// This file use the response (received in appApi.js) to update Redux state
import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "../services/appApi";
import { authApi } from "../services/authApi";

const initialState = null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => {
            return initialState
        },
        // update notifications
        addNotification: (state, action) => {
            state.user.notifications.unshift(action.payload);
        },
        resetNotifications: (state) => {
            state.notifications.forEach((obj) => {
                obj.status = "read";
            });
        },
    },

    // handle data received from BE => update global state here
    extraReducers: (builder) => {
        // update redux store here, payload is the new stateuserSlice
        builder.addMatcher(authApi.endpoints.signup.matchFulfilled, (_, { payload }) => payload);  // '_' is current state (not use), payload is data from back-end
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.addToCart.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.removeFromCart.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.increaseCartProduct.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.decreaseCartProduct.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.createOrder.matchFulfilled, (_, { payload }) => payload);
    },
});

export const {logout, addNotification, resetNotifications } = userSlice.actions;
export default userSlice.reducer;