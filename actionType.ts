import { Book } from "../book/Book";

export const EDIT_BOOK = "EDIT_BOOK";
export const NEW_BOOK = "NEW_BOOK";
export const FETCH_BOOK = "FETCH_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";

export const bookAPI = "http://localhost:3001";

export interface DeleteBookAction {
  type: typeof DELETE_BOOK;
  payload: string;
}

export interface EditBookAction {
  type: typeof EDIT_BOOK;
  payload: Book;
}

export interface FetchBookAction {
  type: typeof FETCH_BOOK;
  payload: Book[];
}

export interface NewBookAction {
  type: typeof NEW_BOOK;
  payload: Book;
}

export type BookActionTypes =
  | DeleteBookAction
  | EditBookAction
  | FetchBookAction
  | NewBookAction;

export type AppAction = BookActionTypes;
