export interface Book {
  id?: string;
  title: string;
  author: string;
  date?: string;
}

interface AllBooks{ 
  books: Book[]
}

interface CurrentBook{
   currentBook : Book | undefined
}

export type BookReducerDefaultState = AllBooks & CurrentBook

