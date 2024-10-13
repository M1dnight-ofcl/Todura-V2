import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todo';
import selectedTaskReducer from './slices/selectedTask';
import settingsReducer from './slices/settings';
export const store=configureStore({
    reducer:{
        todo:todoReducer,
        selectedTask:selectedTaskReducer,
        settings:settingsReducer,
    },
})
