import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: number;
  isTyping?: boolean;
}

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  quickReplies: string[];
  hasStartedChat: boolean;
}

const initialState: ChatState = {
  messages: [],
  isTyping: false,
  quickReplies: ['sideEffects', 'emotions', 'logistics', 'doctorQuestions'],
  hasStartedChat: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<Message, 'id' | 'timestamp'>>) => {
      const message: Message = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      state.messages.push(message);
      
      // Mark chat as started when user sends first message
      if (message.sender === 'user' && !state.hasStartedChat) {
        state.hasStartedChat = true;
      }
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.hasStartedChat = false;
    },
    setQuickReplies: (state, action: PayloadAction<string[]>) => {
      state.quickReplies = action.payload;
    },
    startChat: (state) => {
      state.hasStartedChat = true;
      // Add welcome message if none exists
      if (state.messages.length === 0) {
        state.messages.push({
          id: 'welcome',
          text: 'שלום! אני ניארה, ואני כאן כדי לתמוך בך במסע שלך. איך אני יכולה לעזור לך היום?',
          sender: 'assistant',
          timestamp: Date.now(),
        });
      }
    },
  },
});

export const { addMessage, setTyping, clearMessages, setQuickReplies, startChat } = chatSlice.actions;
export default chatSlice.reducer;