import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoReducer from './slices/todo';
import selectedTaskReducer from './slices/selectedTask';
import settingsReducer from './slices/settings';
import currentTabReducer from './slices/currentTab';
const rootReducer=combineReducers({ 
  todo:todoReducer,
  selectedTask:selectedTaskReducer,
  settings:settingsReducer,
  currentTab:currentTabReducer,
})

const persistedReducer=persistReducer({
  key: "root",
  storage,
},rootReducer);
export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
    }),
});
export const persistor=persistStore(store);
