import { Book } from '../types';

export interface CartState {
  books: { [bookId: string]: { data: Book; count: number } };
  selectedBooks: string[];
  countBasket: number;
}

interface AddBookToCartAction {
  type: 'ADD_BOOK_TO_CART';
  payload: Book;
}

interface RemoveBookFromCartAction {
  type: 'REMOVE_BOOK_FROM_CART';
  payload: Book;
}

interface IncrementBookCountAction {
  type: 'INCREMENT_BOOK_COUNT';
  payload: string;
}

interface DecrementBookCountAction {
  type: 'DECREMENT_BOOK_COUNT';
  payload: string;
}

interface UpdateSelectedBooksAction {
  type: 'UPDATE_SELECTED_BOOKS';
  payload: {
    bookId: string;
    isSelected: boolean;
  };
}

interface UpdateCountBasketAction {
  type: 'UPDATE_COUNT_BASKET';
  payload: number;
}

export type CartAction =
  | AddBookToCartAction
  | RemoveBookFromCartAction
  | IncrementBookCountAction
  | DecrementBookCountAction
  | UpdateSelectedBooksAction
  | UpdateCountBasketAction;

const initialState: CartState = {
  books: {},
  selectedBooks: [],
  countBasket: 0,
};

export const cartReducer = (state: CartState = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_BOOK_TO_CART':
      const addBookId = action.payload.selfLink;
      const bookCount = state.books[addBookId] ? state.books[addBookId].count + 1 : 1;
      return {
        ...state,
        books: {
          ...state.books,
          [addBookId]: { data: action.payload, count: bookCount },
        },
        countBasket: state.countBasket + 1,
    };
    
case 'REMOVE_BOOK_FROM_CART':
  const removedBook = state.books[action.payload.selfLink];
  const removedBookCount = removedBook?.count || 0;
  const updatedBooks = { ...state.books };
  delete updatedBooks[action.payload.selfLink];
  return {
    ...state,
    books: updatedBooks,
    countBasket: state.countBasket - removedBookCount,
};

case 'INCREMENT_BOOK_COUNT':
  return {
    ...state,
    books: {
      ...state.books,
      [action.payload]: {
        ...state.books[action.payload],
        count: state.books[action.payload].count + 1,
      },
    },
    countBasket: state.countBasket + 1, 
};

case 'DECREMENT_BOOK_COUNT':
  if (state.books[action.payload].count > 1) {
    return {
      ...state,
      books: {
        ...state.books,
        [action.payload]: {
          ...state.books[action.payload],
          count: state.books[action.payload].count - 1,
        },
      },
      countBasket: state.countBasket - 1, 
    };
  } else {
    return state;
  }
    case 'UPDATE_SELECTED_BOOKS':
      const { bookId: updatedBookId, isSelected } = action.payload;
      const updatedSelectedBooks = isSelected
        ? [...state.selectedBooks, updatedBookId]
        : state.selectedBooks.filter((id) => id !== updatedBookId);

      return {
        ...state,
        selectedBooks: updatedSelectedBooks,
      };
    case 'UPDATE_COUNT_BASKET':
      return {
        ...state,
        countBasket: action.payload,
      };
    default:
      return state;
  }
};
