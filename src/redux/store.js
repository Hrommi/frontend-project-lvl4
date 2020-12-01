import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const createStore = (preloadedState) => configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default createStore;
