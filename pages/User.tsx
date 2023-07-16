import { useState } from 'react';
import Head from 'next/head';
import Layout from '../Layout';
import Image from 'next/image';
import styles from '../styles/User.module.css';

interface UserProps {
  countBasket: number;
}

const User: React.FC<UserProps> = ({ countBasket = 0 }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Alexey Korsakov');
  const [email, setEmail] = useState('alexkorsakow@mail.ru');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
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

      <div className={styles.main_container}>
        <div className={styles.container_user}>
          <div>
            <h1 className={styles.profile}>PROFILE</h1>
            <Image src="/user_pic.png" alt="userpic" width={235} height={235} />
          </div>
          <div className={styles.data_user}>
            <div className={styles.group_user}>
              <p className={styles.title_name}>YOUR NAME</p>
              {isEditing ? (
                <input type="text" value={name} onChange={handleNameChange} />
              ) : (
                <p className={styles.name}>{name}</p>
              )}
            </div>
            <div className={styles.group_mail}>
              <p className={styles.title_mail}>YOUR EMAIL</p>
              {isEditing ? (
                <input type="email" value={email} onChange={handleEmailChange} />
              ) : (
                <p className={styles.mail}>{email}</p>
              )}
            </div>
            {isEditing ? (
              <button className={styles.butt_save} onClick={handleSaveClick}>
                SAVE PROFILE
              </button>
            ) : (
              <button className={styles.butt_edit} onClick={handleEditClick}>
                EDIT PROFILE
              </button>
            )}
          </div>
        </div>

        <div className={styles.about}>
          <div className={styles.container_text}>
            <h3 className={styles.title_text}>ABOUT ME</h3>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat, ornare nisi et, ultrices
              libero. Nunc nibh dolor, maximus quis auctor nec, tempor quis ipsum. Proin mollis pellentesque nulla ac
              varius.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
