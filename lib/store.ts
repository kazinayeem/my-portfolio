import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./services/blogApi";
import { adminApi } from "./services/adminApi";
import { publicApi } from "./services/publicApi";

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(blogApi.middleware)
      .concat(adminApi.middleware)
      .concat(publicApi.middleware),
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
