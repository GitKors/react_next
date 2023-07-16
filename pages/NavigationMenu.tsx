import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/NavigationMenu.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addBookToCart, removeBookFromCart, updateCountBasket, updateSelectedBooks } from '../redux/cartActions';
import { Book } from '../types';

interface NavigationMenuProps {
  initialCategory: string;
  initialBooks: Book[];
  setCountBasket: React.Dispatch<React.SetStateAction<number>>;
}

const NavigationMenu = ({ initialCategory, initialBooks, setCountBasket }: NavigationMenuProps) => {
  const [currentBooks, setCurrentBooks] = useState(initialBooks);
  const [loadIndex, setLoadIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(initialCategory);
  const booksInCart = useSelector((state: any) => state.cart.books);
  const selectedBooks = useSelector((state: any) => state.cart.selectedBooks);
  const dispatch = useDispatch();

  const countBasket = useSelector((state: any) => state.cart.countBasket);

  useEffect(() => {
    const categoryList = document.getElementById('category-list');
    if (categoryList) {
      const firstCategoryItem = categoryList.children[0] as HTMLLIElement;
      firstCategoryItem.classList.add(styles.bold);
    }
  }, []);

  const getData = async (subjectName) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q="subject:${subjectName}"&key=AIzaSyDbbM8_tK8pqO0hytMq7qbnl7PwD8vh3S0&printType=books&startIndex=${loadIndex}&maxResults=6&langRestrict=en`
      );
      const result = response.data;
      setLoadIndex(loadIndex + 6);
      const booksWithSelfLink = result.items.map((book) => ({
        ...book,
        selfLink: book.id, 
      }));
      setCurrentBooks((prevBooks) => [...prevBooks, ...booksWithSelfLink]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setCurrentCategory(categoryName);
    setLoadIndex(0);
    setCurrentBooks([]);
    getData(categoryName);

    const categoryList = document.getElementById('category-list');
    if (categoryList) {
      const prevSelectedCategory = categoryList.querySelector(`.${styles.bold}`);
      if (prevSelectedCategory) {
        prevSelectedCategory.classList.remove(styles.bold);
      }

      const currentSelectedCategory = categoryList.querySelector(`li[data-category="${categoryName}"]`);
      if (currentSelectedCategory) {
        currentSelectedCategory.classList.add(styles.bold);
      }
    }
  };
  

  const handleCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    const bookId = event.currentTarget.id;
    const selectedBook = currentBooks.find((book) => book.selfLink === bookId);
  
    if (selectedBook) {
      const bookId = selectedBook.selfLink;
      const isInCart = selectedBooks.includes(bookId);
    
      if (isInCart) {
        dispatch(removeBookFromCart(selectedBook));
        dispatch(updateCountBasket(countBasket - 1));
      } else {
        dispatch(addBookToCart(selectedBook));
        dispatch(updateCountBasket(countBasket + 1));
      }
    

      const updatedSelectedBooks = Object.keys(booksInCart);
      const isSelected = !isInCart;
      dispatch(updateSelectedBooks(bookId, isSelected));
    }
  };
  
  
  
  
  
  
    const writeAuthor = (book: Book) => {
    if (book.volumeInfo && book.volumeInfo.authors) {
      return book.volumeInfo.authors.join(', ');
    }
    return '';
    };

  const averageRating = (book) => {
    if (book.volumeInfo && book.volumeInfo.averageRating) {
      const stars = [];
      for (let i = 0; i < book.volumeInfo.averageRating; i++) {
        stars.push(<img key={i} src="star.svg" alt="star" />);
      }
      return <div style={{ display: 'flex' }}>{stars}</div>;
    }
    return null;
  };

  const getRating = (book) => {
    if (book.volumeInfo?.ratingsCount) {
      return `${book.volumeInfo.ratingsCount}M review`;
    } else {
      return '';
    }
  };

  const writeDescription = (book) => {
    if (book.volumeInfo?.description) {
      if (book.volumeInfo.description.length < 100) {
        return book.volumeInfo.description;
      } else {
        return book.volumeInfo.description.slice(0, 100) + ' . . . ';
      }
    } else {
      return '';
    }
  };

  const countPrice = (book) => {
    if (book.saleInfo && book.saleInfo.listPrice && book.saleInfo.listPrice.amount) {
      return `Price: $${book.saleInfo.listPrice.amount}`;
    }
    return '';
  };


    const renderButton = (book: Book, bookId: string) => {
      const isInCart = selectedBooks.includes(book.selfLink);
    
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
    
  

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.navigation}>
          <div className={styles['nav-menu']}>
            <ul id="category-list" className={styles['category_list']}>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Architecture' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Architecture')}
              >
                Architecture
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Art & Fashion' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Art & Fashion')}
              >
                Art & Fashion
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Biography' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Biography')}
              >
                Biography
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Business' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Business')}
              >
                Business
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Crafts & Hobbies' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Crafts & Hobbies')}
              >
                Crafts & Hobbies
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Drama' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Drama')}
              >
                Drama
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Fiction' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Fiction')}
              >
                Fiction
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Food & Drink' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Food & Drink')}
              >
                Food & Drink
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Health & Wellbeing' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Health & Wellbeing')}
              >
                Health & Wellbeing
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'History & Politics' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('History & Politics')}
              >
                History & Politics
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Humor' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Humor')}
              >
                Humor
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Poetry' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Poetry')}
              >
                Poetry
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Psychology' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Psychology')}
              >
                Psychology
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Science' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Science')}
              >
                Science
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Technology' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Technology')}
              >
                Technology
              </li>
              <li
                className={`${styles['category-item']} ${currentCategory === 'Travel & Maps' ? styles.bold : ''}`}
                onClick={() => handleCategoryClick('Travel & Maps')}
              >
                Travel & Maps
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.cards}>
          {currentBooks.map((book) => (
            <div className={styles.card} key={book.selfLink}>
              <div className={styles['card-image']}>
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || 'placeholder.png'}
                  className={styles.pic_wrapp}
                  alt="cover"
                />
              </div>
              <div className={styles['card-item']}>
                <p className={styles.authors}>{writeAuthor(book)}</p>
                <p className={styles['title-card']}>{book.volumeInfo.title}</p>
                {averageRating(book)}
                <p className={styles.rating}>{getRating(book)}</p>
                <p className={styles['item-card']}>{writeDescription(book)}</p>
                <p className={styles['price-card']}>{countPrice(book)}</p>
                {renderButton(book, book.selfLink)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles['load-data']}>
        <button className={styles['load_more']} onClick={() => getData(currentCategory)}>
          ЗАГРУЗИТЬ ЕЩЁ
        </button>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const initialCategory = 'Architecture';
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q="subject:${initialCategory}"&key=AIzaSyDbbM8_tK8pqO0hytMq7qbnl7PwD8vh3S0&printType=books&startIndex=0&maxResults=6&langRestrict=en`
  );
  const result = response.data;

  return {
    props: {
      initialCategory,
      initialBooks: result.items,
    },
  };
}


export default NavigationMenu;
