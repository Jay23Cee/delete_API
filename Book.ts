// Todo: better to IBook
export interface Book {
  id?: string;
  title: string;
  author: string;
  date?: string;
}

export const BookRedeucerDefaultState: Book[] = [];

// {books:Book[], currentBook: Book}
