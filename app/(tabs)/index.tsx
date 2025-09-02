import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addMessage, setTyping, startChat } from '@/src/store/slices/chatSlice';
import { setEmergencyDialog } from '@/src/store/slices/uiSlice';
import { ChatHeader } from '@/src/components/ChatHeader';
import { ChatWelcome } from '@/src/components/ChatWelcome';
import { MessageBubble } from '@/src/components/MessageBubble';
import { TypingIndicator } from '@/src/components/TypingIndicator';
import { InputBar } from '@/src/components/InputBar';
import { QuickReplies } from '@/src/components/QuickReplies';
import { SafetyBanner } from '@/src/components/SafetyBanner';
import { EmergencyDialog } from '@/src/components/EmergencyDialog';
import { chatService } from '@/src/services/chatService';
import { moderateMessage, generateSafetyResponse } from '@/src/services/moderationService';
import { useTheme } from '@/src/theme/useTheme';

export default function ChatScreen() {
  const dispatch = useAppDispatch();
  const { messages, isTyping, hasStartedChat } = useAppSelector(state => state.chat);
  const { isRTL } = useAppSelector(state => state.settings);
  const { colors } = useTheme();
  const flashListRef = useRef<FlashList<any>>(null);

  const handleSendMessage = async (text: string) => {
    // Start chat if not started
    if (!hasStartedChat) {
      dispatch(startChat());
    }

    // Check for crisis indicators
    const moderation = moderateMessage(text);
    
    if (moderation.isCrisis) {
      dispatch(setEmergencyDialog(true));
      // Still add the user message but also add a safety response
      dispatch(addMessage({ text, sender: 'user' }));
      dispatch(addMessage({ 
        text: generateSafetyResponse(moderation), 
        sender: 'system' 
      }));
      return;
    }

    // Handle medical advice requests
    if (moderation.isMedicalAdvice) {
      dispatch(addMessage({ text, sender: 'user' }));
      dispatch(addMessage({ 
        text: generateSafetyResponse(moderation), 
        sender: 'system' 
      }));
      return;
    }

    // Add user message
    dispatch(addMessage({ text, sender: 'user' }));
    
    // Show typing indicator
    dispatch(setTyping(true));
    
    try {
      // Get AI response
      const response = await chatService.sendMessage(text, messages);
      
      // Add assistant response
      dispatch(addMessage({ text: response, sender: 'assistant' }));
    } catch (error) {
      console.error('Chat error:', error);
      dispatch(addMessage({ 
        text: 'מצטערת, חלה שגיאה. אנא נסי שוב.', 
        sender: 'system' 
      }));
    } finally {
      dispatch(setTyping(false));
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleStartChat = () => {
    dispatch(startChat());
  };

  const handleLearnMore = () => {
    // Navigate to resources tab or show info
    dispatch(startChat());
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0 && hasStartedChat) {
      setTimeout(() => {
        flashListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length, isTyping, hasStartedChat]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    listContainer: {
      flex: 1,
    },
    listContent: {
      paddingTop: 8,
    },
  });

  // Show welcome screen if chat hasn't started
  if (!hasStartedChat) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ChatWelcome 
          onGetStarted={handleStartChat}
          onLearnMore={handleLearnMore}
          isRTL={isRTL}
        />
        <SafetyBanner />
        <EmergencyDialog />
      </SafeAreaView>
    );
  }

  const messagesWithTyping = isTyping 
    ? [...messages, { id: 'typing', text: '', sender: 'assistant' as const, timestamp: Date.now(), isTyping: true }]
    : messages;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ChatHeader />
      <SafetyBanner />
      
      <View style={styles.listContainer}>
        <FlashList
          ref={flashListRef}
          data={messagesWithTyping}
          renderItem={({ item }) => 
            item.isTyping ? <TypingIndicator /> : <MessageBubble message={item} isRTL={isRTL} />
          }
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          estimatedItemSize={80}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
      <QuickReplies onSelect={handleQuickReply} isRTL={isRTL} />
      <InputBar onSend={handleSendMessage} isRTL={isRTL} disabled={isTyping} />
      
      <EmergencyDialog />
    </SafeAreaView>
  );
}