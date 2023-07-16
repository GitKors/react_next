import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../Layout';
import { useEffect } from 'react';
import { removeBookFromCart, addBookToCart, incrementBookCount, decrementBookCount } from '../redux/cartActions';
import styles from '../styles/Cart.module.css';
import Head from 'next/head';
import { averageRating } from '../expFunc/utils';
import { getRating } from '../expFunc/utils';
import { Book } from '../types';
import { countPrice } from '../expFunc/utils';

export interface CartState {
  books: { [bookId: string]: { data: Book; count: number } };
  selectedBooks: string[];
  countBasket: number;
}

const CartPage = () => {
  const cartBooks = useSelector((state: any) => state.cart.books);
  const router = useRouter();
  const dispatch = useDispatch();
  const countBasket = useSelector((state: any) => state.cart.countBasket);

  useEffect(() => {
    const query = Object.keys(cartBooks).length > 0 ? `?countBasket=${countBasket}&isInCart=true` : '';
    router.push(router.pathname + query, undefined, { shallow: true });
  }, [cartBooks]);

  const handleIncrement = (event, bookId: string) => {
    event.preventDefault();
    dispatch(incrementBookCount(bookId));
  };

  const handleDecrement = (event, bookId: string) => {
    event.preventDefault();
    dispatch(decrementBookCount(bookId));
  };

  //Подсчет общей суммы цен книг в корзине
  const calculateTotalPrice = () => {
    let totalPrice = 0;
  
    Object.values(cartBooks).forEach(({ data, count }) => {
      const bookPrice = parseFloat(data.saleInfo?.listPrice?.amount);
      if (!isNaN(bookPrice)) {
        const price = bookPrice * count;
        totalPrice += price;
      }
    });
  
    return totalPrice.toFixed(2);
  };

  return (
    <Layout countBasket={countBasket}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bruno+Ace&family=Inter:wght@700&family=Montserrat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.cart_container}>
        <h1 className={styles.cart_title}>SHOPPING CART</h1>
        <div className={styles.cart_items}>
          <p className={styles.cart_item}>ITEM</p>
          <p className={styles.cart_quantity}>QUANTITY</p>
          <p className={styles.cart_price}>PRICE</p>
          <p className={styles.cart_delivery}>DELIVERY</p>
        </div>

        {Object.keys(cartBooks).length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <ul className={styles.list_books}>
            {Object.values(cartBooks as { [key: string]: { data: Book; count: number } }).map(({ data, count }) => (
              <li key={data.selfLink} className={styles.books}>
                <img src={data.volumeInfo.imageLinks?.thumbnail} alt={data.volumeInfo.title} className={styles.pic_book} />
                <div className={styles.cart_info}>
                  <div className={styles.cont_cart_info}>
                    <h3 className={styles.title_book}>{data.volumeInfo.title}</h3>
                    <p className={styles.autor_book}>{data.volumeInfo.authors?.join(', ')}</p>
                    <div className={styles.rating}>
                      <p>{averageRating(data)}</p>
                      <p className={styles.rating_info}>{getRating(data)}</p>
                    </div>
                  </div>
                  <div className={styles.main_cont}>
                    <div className={styles.book_count_container}>
                      <button
                        type="button"
                        className={`${styles.butt_plus} ${styles.button}`}
                        onClick={(event) => handleIncrement(event, data.selfLink)}
                      >
                        <span className={styles.iconcount}>+</span>
                      </button>
                      <p className={styles.book_count}>{count}</p>
                      <button
                        type="button"
                        className={`${styles.butt_min} ${styles.button}`}
                        onClick={(event) => handleDecrement(event, data.selfLink)}
                      >
                        <span className={styles.iconcount}>-</span>
                      </button>
                    </div>
                    <p className={styles.price}>{countPrice(data)}</p>
                    <p>Shipping: delivery</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.total_price}>
          TOTAL PRICE: ${calculateTotalPrice()}
        </div>
        <button className={styles.check}>CHECKOUT</button>
      </div>
    </Layout>
  );
};

export default CartPage;
