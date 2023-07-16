import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { cartReducer } from '../redux/cartReducer';
import thunkMiddleware from 'redux-thunk';
import { appStore as store, persistor } from './configureStore'; 


const rootReducer = combineReducers({
  cart: cartReducer,

});

const appStore = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), thunkMiddleware],
});

export { appStore as store, persistor };





