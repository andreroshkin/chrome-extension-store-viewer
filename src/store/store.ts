import { configureStore } from "@reduxjs/toolkit";
import actionItemReducer from '../components/actionItem/actionItemSlice'

export const store = configureStore({
    reducer: {
        actionItem: actionItemReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch