import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice'
import studentReducer from './studentsSlice'
import adminReducer from './adminSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const reducers = combineReducers({
    auth: authReducer,
    students: studentReducer,
    admins: adminReducer
});
  
const persistedReducer = persistReducer(persistConfig, reducers)
  

export const store = configureStore({
  reducer: persistedReducer,  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})