import { v4 as uuidv4 } from "uuid";
import {
  FETCH_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  NEW_BOOK,
} from "../book/actionType";
import { CreateBook, DeleteBook, fetchBooks, EditBook } from "../../utils";
import { AppAction } from "../book/actionType";
import { Book } from "../book/Book";
import { Dispatch } from "redux";
import AppState from "../store";

export const TodayDate = () => {
  const today = new Date();

  return today.toString();
};

// Simplified

export const startFetchBook = () => {
  return async (
    dispatch: Dispatch<AppAction>,
    getState: () => typeof AppState
  ) => {
    const books = await fetchBooks();
    dispatch({ type: FETCH_BOOK, payload: books });
  };
};

export const startEditBook = (book: Book) => {
  return async (dispatch: Dispatch<AppAction>, getState: () => typeof AppState) => {
    await EditBook(book);
    dispatch({ type: EDIT_BOOK, payload: book });
  };
};

export const startDeleteBook = (book: Partial<Book>) => {
  return async (dispatch: Dispatch<AppAction>, getState: () => typeof AppState) => {
    await DeleteBook(book);
    if (!book.id) {
      return;
    }
    dispatch({
      type: DELETE_BOOK,
      payload: book.id,
    });
  };
};

export const startNewBook = (book: Book) => {
  return async (dispatch: Dispatch<AppAction>, getState: () => typeof AppState) => {
    await CreateBook(book);

    return dispatch({
      type: NEW_BOOK,
      payload: book,
    });
  };
};
