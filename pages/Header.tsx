import { useState } from 'react';
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {addBookToCart} from "../redux/cartActions"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const countBasket = useSelector((state: any) => state.cart.countBasket);

  

  const handleUserClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
    setErrorMessage('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
    setErrorMessage('');
  };

  const handleLogin = () => {
    if (email === 'alexkorsakow@mail.ru' && password === '123456') {

      router.push('/User');
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };

  const isValidEmail = (value: string) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };




  const dispatch = useDispatch();


  const handleCart = () => {
    router.push('/CartPage');
  };

  const handleAddToCart = (book) => {
    dispatch(addBookToCart(book));
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bruno+Ace&family=Inter:wght@700&family=Montserrat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header className={styles.header}>
        <div className={styles.navigation__header}>
          <div className={styles.logo}>
            <Link href="/" className={styles.link_main}>
              <h2 className={styles.logo__item}>Bookshop</h2>
            </Link>
          </div>

          <div className={styles.menuNav}>
            <a href="/" className={styles.fattyLink}>
              books
            </a>
            <a href="/" className={styles.navLink}>
              audiobooks
            </a>
            <a href="/" className={styles.navLink}>
              Stationery & gifts
            </a>
            <a href="/" className={styles.navLink}>
              blog
            </a>
          </div>

          <div className={styles.iconItems}>
            <div className={styles.userContainer}>
              <img
                src="/user.svg"
                className={styles.user}
                alt="user"
                onClick={handleUserClick}
              />
              {isModalOpen && (
                <div className={styles.loginModal}>
                  <div className={styles.loginModalContent}>
                    <div className={styles.loginModalHeader}>
                      <h3 className={styles.loginModalTitle}>Log In</h3>
                      <span
                        className={styles.loginModalClose}
                        onClick={handleUserClick}
                      >
                        <Image
                          src="/close.png"
                          alt="close"
                          width={32}
                          height={32}
                        />
                      </span>
                    </div>
                    <div className={styles.loginModalBody}>
                      <label
                        className={styles.loginModalLabel}
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className={`${styles.loginModalInput} ${
                          emailError && styles.errorInput
                        }`}
                        type="email"
                        id="email"
                        placeholder="example@mail.ru"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={() => {
                          if (!isValidEmail(email)) {
                            setEmailError('Invalid email format.');
                          }
                        }}
                      />
                      {emailError && (
                        <div className={styles.errorMessage}>{emailError}</div>
                      )}

                      <label
                        className={styles.loginModalLabel}
                        htmlFor="password"
                      >
                        Password
                      </label>

                      <input
                        className={`${styles.loginModalInput} ${
                          passwordError && styles.errorInput
                        }`}
                        type="password"
                        id="password"
                        placeholder="********"
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={() => {
                          if (password.length < 6) {
                            setPasswordError(
                              'Your password must be at least 6 characters long.'
                            );
                          }
                        }}
                      />
                      {passwordError && (
                        <div className={styles.errorMessage}>
                          {passwordError}
                        </div>
                      )}
                      <button
                        className={styles.loginModalSubmit}
                        onClick={handleLogin}
                      >
                        Log In
                      </button>
                      {errorMessage && (
                        <div className={styles.errorMessage}>
                          {errorMessage}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <img
              src="/search.svg"
              className={styles.search}
              alt="search"
            />

            <div className={styles.cartContainer} onClick={handleCart}>
              <img
                src="/shop bag.svg"
                className={styles.shopBag}
                alt="shop bag"
              />
              <p className={styles.countBasket}>{countBasket}</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
