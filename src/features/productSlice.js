// This file use the response (received in appApi.js) to update Redux state
import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "../services/appApi";

const initialState = [];

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // This function only for update state when Home component is re-render
        updateProducts: (_, action) => {   // get data from Home component to update state
            return action.payload;  // => returns the payload data as the new state 
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.createProduct.matchFulfilled, (_, { payload }) => payload);  // update when request made from appApi
        builder.addMatcher(appApi.endpoints.updateProduct.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.deleteProduct.matchFulfilled, (_, { payload }) => payload);
    },
});

export const { updateProducts } = productSlice.actions;
export default productSlice.reducer;