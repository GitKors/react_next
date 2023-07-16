import { store, persistor } from "../redux/store";
import { Provider } from 'react-redux';

function CustomApp({ Component, pageProps }) {  
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  )
}

export default CustomApp;
