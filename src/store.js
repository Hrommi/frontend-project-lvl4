import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const getStore = (preloadedState) => configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default getStore;
