import { Book, BookReducerDefaultState } from "../book/Book";
import { BookActionTypes } from "../book/actionType";
import {
  FETCH_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  NEW_BOOK,
} from "../book/actionType";

const defaultState: BookReducerDefaultState = {
  books: [],
  currentBook: undefined
};

/******* BOOKREDUCER ******/
const bookReducer = (
  state: BookReducerDefaultState = defaultState,
  action: BookActionTypes
): BookReducerDefaultState => {
  switch (action.type) {
    case FETCH_BOOK:
      return {
        ...state, 
        books: action.payload
      };
    case EDIT_BOOK: 
      return {
        ...state,
        currentBook: state.books.find(book => book.id === action.payload.id)
      };
    case DELETE_BOOK:
      return {
        ...state,
        currentBook: state.books.find(book => book.id !== action.payload)
      };
    case NEW_BOOK:
      return {
        ...state,
        currentBook: action.payload
      };
    default:
      return state;
  }
};

export { bookReducer };
