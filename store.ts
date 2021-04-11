import { createStore,  applyMiddleware, combineReducers } from "redux";
import { bookReducer } from "../store/book/booksReducer";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import { routerReducer } from "react-router-redux";

export const rootReducer = combineReducers({
  books: bookReducer,
  routing: routerReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootStore = ReturnType<typeof rootReducer>;

export default store;
