import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Message } from './chatSlice';

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  messages: Message[];
}

interface SessionsState {
  conversations: Conversation[];
  activeId?: string;
}

const initialState: SessionsState = {
  conversations: [],
  activeId: undefined,
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    ensureActive: (state, action: PayloadAction<{ title: string }>) => {
      if (!state.activeId) {
        const newId = Date.now().toString();
        state.conversations.unshift({ id: newId, title: action.payload.title, createdAt: Date.now(), messages: [] });
        state.activeId = newId;
      }
    },
    updateActiveMessages: (state, action: PayloadAction<Message[]>) => {
      if (!state.activeId) return;
      const convo = state.conversations.find(c => c.id === state.activeId);
      if (convo) {
        convo.messages = action.payload;
      }
    },
    switchToConversation: (state, action: PayloadAction<string>) => {
      state.activeId = action.payload;
    },
    clearActiveConversation: (state) => {
      state.activeId = undefined;
    },
    renameConversation: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const convo = state.conversations.find(c => c.id === action.payload.id);
      if (convo) convo.title = action.payload.title;
    },
  },
});

export const { ensureActive, updateActiveMessages, switchToConversation, clearActiveConversation, renameConversation } = sessionsSlice.actions;
export default sessionsSlice.reducer;


