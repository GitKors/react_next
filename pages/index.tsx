import React from "react";
import axios from "axios";
import { Provider } from "react-redux"; 
import Header from "./Header";
import Slider from "./Slider";
import NavigationMenu from "./NavigationMenu";
import Footer from "./Footer";
import Head from "next/head";
import { useState } from "react";
import { removeBookFromCart } from '../redux/cartActions';
import { PersistGate } from "redux-persist/integration/react"; 
import { store, persistor } from "../redux/store";


const HomePage = ({ initialCategory, initialBooks }) => {
  const [countBasket, setCountBasket] = useState(0);

  return (
    <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>

      <Head>
        <title>React+Next</title>
        <meta charSet="utf-8" />
      </Head>
      <Header/>
      <Slider />
      <NavigationMenu
        initialCategory={initialCategory}
        initialBooks={initialBooks}
        setCountBasket={setCountBasket}
      />
      <Footer />
      </PersistGate>
    </Provider>

  );
};

export async function getStaticProps() {
  const initialCategory = "Architecture";
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

export default HomePage;
