import { Book } from '../types';

export const addBookToCart = (book: Book) => {
  return {
    type: 'ADD_BOOK_TO_CART',
    payload: book,
  };
};

export const removeBookFromCart = (book: Book) => {
  return {
    type: 'REMOVE_BOOK_FROM_CART',
    payload: book,
  };
};

export const incrementBookCount = (bookId: string) => {
  return {
    type: 'INCREMENT_BOOK_COUNT',
    payload: bookId,
  };
};

export const decrementBookCount = (bookId: string) => {
  return {
    type: 'DECREMENT_BOOK_COUNT',
    payload: bookId,
  };
};

export const updateSelectedBooks = (bookId: string, isSelected: boolean) => {
  return {
    type: 'UPDATE_SELECTED_BOOKS',
    payload: {
      bookId,
      isSelected,
    },
  };
};

export const updateCountBasket = (count: number) => {
  return {
    type: 'UPDATE_COUNT_BASKET',
    payload: count,
  };
};

