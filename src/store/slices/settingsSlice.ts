import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  language: 'he' | 'en';
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  isRTL: boolean;
}

const initialState: SettingsState = {
  language: 'he',
  theme: 'system',
  fontSize: 'medium',
  isRTL: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'he' | 'en'>) => {
      state.language = action.payload;
      state.isRTL = action.payload === 'he';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
    },
  },
});

export const { setLanguage, setTheme, setFontSize } = settingsSlice.actions;
export default settingsSlice.reducer;