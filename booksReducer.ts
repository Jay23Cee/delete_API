import { Book, BookRedeucerDefaultState } from "../book/Book";
import { BookActionTypes } from "../book/actionType";
import {
  FETCH_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  NEW_BOOK,
} from "../book/actionType";

/******* BOOKREDUCER ******/
const bookReducer = (
  state = BookRedeucerDefaultState,

  action: BookActionTypes
): Book[] => {
  switch (action.type) {
    case FETCH_BOOK:
      return action.payload; // return as an array {...state, books: action.books}
    case EDIT_BOOK: // THIS NEEDS A BETTER WAY TO EDIT.
      return state.map((books) => {
        if (books.id === action.payload.id) {
          return {
            ...books,
            ...action.payload,
          };
        } else {
          return books;
        }
      });
    case DELETE_BOOK:
      return state.filter(({ id }) => id !== action.payload);
    case NEW_BOOK:
      return [...state, action.payload]; // return as an object {...state, newBook: action.book}

    default:
      return state;
  }
};

export { bookReducer };
