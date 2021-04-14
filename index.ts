import axios from "axios";

import { Book } from "../store/book/Book";

const API = "http://localhost:3001";

//Fetching Book from API
export const fetchBooks = async () => {
  try {
    const res = await axios.get(`${API}/Books`);
    return Promise.resolve(res.data);

  } catch (err) {
    throw err;
  }
};

// Updating Book to API
export const EditBook = async (book: Book) => {
  const id = book.id;
  const title = book.title;
  const author = book.author;

  try {
    const books = await axios
      .post(`${API}/Books/${id}/${title}/${author}`)
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

    return books;
  } catch (err) {
    throw err;
  }
};

// Delete book in API'
export const DeleteBook = async (book: Partial<Book>) => {
  const id = book.id!;

  try {
    const books = await axios.post(`${API}/Books/delete/${id}`).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    return books;
  } catch (err) {
    console.log("Unable to Create Book");
    throw err;
  }
};

// Creating a book to Database
export const CreateBook = async (book: Book) => {
  const title = book.title;
  const author = book.author;

  try {
    const res = await axios.post(`${API}/Books/${title}/${author}`);

    return res;
  } catch (err) {
    console.log("Unable to Create Book");
    throw err;
  }
};

