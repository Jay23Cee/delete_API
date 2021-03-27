import { Book } from "../book/Book"
import {v4 as uuidv4} from 'uuid';
import {BookActionTypes} from "../book/actionType"
import {
    FETCH_BOOK,
    EDIT_BOOK,
    DELETE_BOOK,
    NEW_BOOK,
    
} from  "../book/actionType"



/**************************
 ******* LOCAL DATABASE ***
 **************************/
const BookRedeucerDefaultState: Book[] =[];
for (let i = 0; i < 10; i++) {
   BookRedeucerDefaultState.push({
      key: uuidv4(),
      title: `Horror story ${i}`,
      author: `Bill`,
      date: `1-23-198${i}`,
  
     
    });
  }


/************************
 ******* BOOKREDUCER ****
 ************************/
const bookReducer =(state = BookRedeucerDefaultState, action: BookActionTypes): Book[] =>{
    switch(action.type){
        case FETCH_BOOK:
            return { ...state, ...action.book}
        case EDIT_BOOK:   // THIS NEEDS A BETTER WAY TO EDIT. 
            return state.map(books => {
                if (books.key === action.book.key){
                    return {
                        ...books,
                        ...action.book
                    };

                }else{
                    return books;
                }
            })
        case DELETE_BOOK:
            return state.filter(({ key}) => key !== action.key);
        case NEW_BOOK:
            return [...state, action.book]

        default:
            return state;


    }

}




export {bookReducer}