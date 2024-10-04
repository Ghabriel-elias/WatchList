import {combineReducers, configureStore} from '@reduxjs/toolkit';
import favorites from './favorites'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
};

const rootReducer = combineReducers({
  favorites: favorites
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;