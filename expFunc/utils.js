export const averageRating = (book) => {
    if (book.volumeInfo && book.volumeInfo.averageRating) {
      const stars = [];
      for (let i = 0; i < book.volumeInfo.averageRating; i++) {
        stars.push(<img key={i} src="star.svg" alt="star" />);
      }
      return <div style={{ display: 'flex' }}>{stars}</div>;
    }
    return null;
  };

 export const getRating = (book) => {
    if (book.volumeInfo?.ratingsCount) {
      return `${book.volumeInfo.ratingsCount}M review`;
    } else {
      return '';
    }
  };

export  const renderButton = (book, bookId) => {
    const isInCart = booksInCart.some((book) => book.selfLink === bookId);

    if (isInCart) {
      return (
        <button className={styles['in-cart']} id={bookId} onClick={handleCart}>
          В КОРЗИНЕ
        </button>
      );
    } else {
      return (
        <button className={styles['buy-button']} id={bookId} onClick={handleCart}>
          КУПИТЬ СЕЙЧАС
        </button>
      );
    }
  };

  export const handleCart = (event, currentBooks, booksInCart, dispatch, setCountBasket) => {
    const bookId = event.currentTarget.id;
    const selectedBook = currentBooks.find((book) => book.selfLink === bookId);
  
    if (selectedBook) {
      const existingBook = booksInCart.find((book) => book.selfLink === bookId);
  
      if (existingBook) {
        dispatch(removeBookFromCart(existingBook));
        setCountBasket((prevCount) => prevCount - 1);
      } else {
        dispatch(addBookToCart(selectedBook));
        setCountBasket((prevCount) => prevCount + 1);
      }
    }
  };

  export const countPrice = (book) => {
    if (book.saleInfo && book.saleInfo.listPrice && book.saleInfo.listPrice.amount) {
      return `$${book.saleInfo.listPrice.amount.toFixed(2)}`;
    }
    return '';
  };