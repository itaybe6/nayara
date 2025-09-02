import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  hasSeenOnboarding: boolean;
  hasAcceptedTerms: boolean;
  profileImage?: string;
  name?: string;
}

const initialState: UserState = {
  hasSeenOnboarding: false,
  hasAcceptedTerms: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOnboardingComplete: (state) => {
      state.hasSeenOnboarding = true;
    },
    acceptTerms: (state) => {
      state.hasAcceptedTerms = true;
    },
    setProfile: (state, action: PayloadAction<{ name?: string; profileImage?: string }>) => {
      state.name = action.payload.name;
      state.profileImage = action.payload.profileImage;
    },
  },
});

export const { setOnboardingComplete, acceptTerms, setProfile } = userSlice.actions;
export default userSlice.reducer;