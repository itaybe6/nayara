import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './slices/chatSlice';
import settingsSlice from './slices/settingsSlice';
import userSlice from './slices/userSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    chat: chatSlice,
    settings: settingsSlice,
    user: userSlice,
    ui: uiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;