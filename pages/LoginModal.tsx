import React, { useState } from 'react';
import styles from '../styles/LoginModal.module.css';
import { useRouter } from 'next/router';

const LoginModal = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
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

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Log In</h3>
          <button className={styles.closeButton} onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="example@mail.ru"
              className={`${styles.loginModalInput} ${emailError && styles.errorInput}`}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="******"
              className={`${styles.loginModalInput} ${passwordError && styles.errorInput}`}
            />
          </div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.loginButton} onClick={handleLogin}>
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
