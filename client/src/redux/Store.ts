import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers";
import React from "react";

/* eslint-disable no-underscore-dangle */
export const store = createStore(rootReducer);
/* eslint-enable */

// ==> typescript

//cấu hình type cho các state mà mình sẽ lấy ở component
// export type RootState = ReturnType<typeof store.getState>;

// //cấu hình dispatch
// export type AppDispatch = typeof store.dispatch;
