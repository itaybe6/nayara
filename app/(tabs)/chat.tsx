import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addMessage, setTyping } from '@/src/store/slices/chatSlice';
import { setEmergencyDialog } from '@/src/store/slices/uiSlice';
import { ChatHeader } from '@/src/components/ChatHeader';
import { MessageBubble } from '@/src/components/MessageBubble';
import { TypingIndicator } from '@/src/components/TypingIndicator';
import { InputBar } from '@/src/components/InputBar';
import { QuickReplies } from '@/src/components/QuickReplies';
import { SafetyBanner } from '@/src/components/SafetyBanner';
import { EmergencyDialog } from '@/src/components/EmergencyDialog';
import { chatService } from '@/src/services/chatService';
import { moderateMessage } from '@/src/services/moderationService';
import { useTheme } from '@/src/theme/useTheme';
import { useTranslation } from 'react-i18next';

export default function ChatScreen() {
  const dispatch = useAppDispatch();
  const { messages, isTyping } = useAppSelector(state => state.chat);
  const { isRTL } = useAppSelector(state => state.settings);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const flashListRef = useRef<FlashList<any>>(null);

  const handleSendMessage = async (text: string) => {
    // Check for crisis indicators
    const moderation = moderateMessage(text);
    
    if (moderation.isCrisis) {
      dispatch(setEmergencyDialog(true));
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
        text: t('chatErrorGeneral'), 
        sender: 'system' 
      }));
    } finally {
      dispatch(setTyping(false));
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flashListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length, isTyping]);

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

  const renderMessage = ({ item }: { item: any }) => (
    <MessageBubble message={item} isRTL={isRTL} />
  );

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