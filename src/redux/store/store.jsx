import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import { contactsReducer } from 'redux/contactsSlicer/contactsSlice';
import { filtersReducer } from 'redux/filterSlicer/filterSlice';
import { nameReducer } from 'redux/nameSlicer/nameSlice';
import { numberReducer } from 'redux/numberSlicer/numberSlice';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const contactReducer = combineReducers({
  contacts: contactsReducer,
  filters: filtersReducer,
  name: nameReducer,
  number: numberReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactReducer
);

export const store = configureStore({
  reducer: persistedContactsReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
