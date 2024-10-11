import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todo';
import selectedTaskReducer from './slices/selectedTask';
export const store=configureStore({
    reducer:{
        todo:todoReducer,
        selectedTask:selectedTaskReducer,
    },
})
