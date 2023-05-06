// This file basically send HTTP request and get response from BE


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    prepareHeaders: (headers) => {
      // Get the token from the local storage
      const token = localStorage.getItem("token");
  
      if (token) {
        // Add the token to the headers
        headers.set("Authorization", `Bearer ${token}`);
      }
  
      return headers;
    },
  });





// create the api  => update the local state by new data receive from API

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery, //: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
    endpoints: (builder) => ({


        // signup: builder.mutation({
        //     query: (user) => ({    // user ={name, email, password}
        //         url: "/users/signup",
        //         method: "POST",
        //         body: user,
        //     }),
        // }),

        // login: builder.mutation({
        //     query: (user) => ({  // user ={name, email, password}
        //         url: "/users/login",
        //         method: "POST",
        //         body: user,
        //     }),
        // }),


        // send create product request to server
        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                body: product,
                method: "POST",
            }),
        }),
        // send delete product request to server
        deleteProduct: builder.mutation({
            query: ({ product_id, user_id }) => ({
                url: `/products/${product_id}`,
                body: {
                    user_id,
                },
                method: "DELETE",
            }),
        }),

        // send update product request to server
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                body: product,
                method: "PATCH",
            }),
        }),

        // send add to cart request
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/add-to-cart",
                body: cartInfo,
                method: "POST",
            }),
        }),

        // remove from cart
        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/remove-from-cart",
                body,
                method: "POST",
            }),
        }),

        // send request in increase the amount of one item??
        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/increase-cart",
                body,
                method: "POST",
            }),
        }),

        // decrease cart
        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/decrease-cart",
                body,
                method: "POST",
            }),
        }),

        // send create order request
        createOrder: builder.mutation({
            query: (body) => ({  // body = {userId, cart, address, country}
                url: "/orders",
                method: "POST",
                body,
            }),
        }),
        
        //
    }),
});

export const {
    //useSignupMutation,  // use and get data at Component
    //useLoginMutation,
    useCreateProductMutation,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useCreateOrderMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = appApi;

export default appApi;