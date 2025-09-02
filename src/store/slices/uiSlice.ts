import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  showSafetyBanner: boolean;
  showEmergencyDialog: boolean;
  isLoading: boolean;
}

const initialState: UiState = {
  showSafetyBanner: true,
  showEmergencyDialog: false,
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSafetyBanner: (state, action: PayloadAction<boolean>) => {
      state.showSafetyBanner = action.payload;
    },
    setEmergencyDialog: (state, action: PayloadAction<boolean>) => {
      state.showEmergencyDialog = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setSafetyBanner, setEmergencyDialog, setLoading } = uiSlice.actions;
export default uiSlice.reducer;