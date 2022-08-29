import { configureStore, combineReducers, compose } from "@reduxjs/toolkit";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  search: searchReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  composeEnhancers,
});
