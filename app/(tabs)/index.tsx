import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ensureActive, updateActiveMessages, clearActiveConversation } from '@/src/store/slices/sessionsSlice';
import { addMessage, setTyping } from '@/src/store/slices/chatSlice';
import { setEmergencyDialog } from '@/src/store/slices/uiSlice';
import { ChatHeader } from '@/src/components/ChatHeader';
// import { ChatWelcome } from '@/src/components/ChatWelcome';
import { MessageBubble } from '@/src/components/MessageBubble';
import { TypingIndicator } from '@/src/components/TypingIndicator';
import { InputBar } from '@/src/components/InputBar';
import { SafetyBanner } from '@/src/components/SafetyBanner';
import { EmergencyDialog } from '@/src/components/EmergencyDialog';
import { chatService } from '@/src/services/chatService';
import { moderateMessage, generateSafetyResponse } from '@/src/services/moderationService';
import { useTheme } from '@/src/theme/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Svg, { Defs, RadialGradient as SvgRadialGradient, Rect, Stop } from 'react-native-svg';
import { MessageCircle, BookOpen, User } from 'lucide-react-native';

export default function ChatScreen() {
  const dispatch = useAppDispatch();
  const { messages, isTyping, hasStartedChat } = useAppSelector(state => state.chat);
  const { isRTL } = useAppSelector(state => state.settings);
  const { colors } = useTheme();
  const flashListRef = useRef<FlashList<any>>(null);
  const router = useRouter();

  const handleSendMessage = async (text: string) => {
    // Start a new conversation if none active
    dispatch(ensureActive({ title: 'שיחה חדשה' }));
    const startingNew = !hasStartedChat && messages.length === 0;

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
    if (startingNew) {
      // Navigate to chat screen when a new conversation starts
      try { router.push('/(tabs)/chat'); } catch {}
    }
    
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

  // Quick replies removed per request

  const handleStartChat = () => {};
  const handleLearnMore = () => {};

  // Do not auto-start chat; show hero until first message

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0 && hasStartedChat) {
      setTimeout(() => {
        flashListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
    // sync messages to active session
    dispatch(updateActiveMessages(messages));
  }, [messages.length, isTyping, hasStartedChat]);

  // When returning home and hero visible, clear active selection so next message starts new session
  useEffect(() => {
    if (!hasStartedChat && messages.length === 0) {
      dispatch(clearActiveConversation());
    }
  }, [hasStartedChat, messages.length]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
    },
    heroContainer: {
      position: 'absolute',
      top: '35%',
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    heroTitle: {
      fontSize: 36,
      fontWeight: '800',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 12,
      lineHeight: 42,
    },
    heroSubtitle: {
      fontSize: 16,
      color: '#E5E7EB',
      textAlign: 'center',
      marginBottom: 20,
      maxWidth: 320,
      lineHeight: 22,
    },
    heroButton: {
      backgroundColor: '#7c3aed',
      borderRadius: 9999,
      paddingHorizontal: 28,
      paddingVertical: 12,
    },
    heroButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    heroChips: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 120,
      paddingHorizontal: 16,
      alignItems: 'center',
      gap: 12,
    },
    chip: {
      width: '100%',
      borderRadius: 9999,
      borderWidth: 1,
      borderColor: 'rgba(124,58,237,0.35)',
      backgroundColor: 'rgba(124,58,237,0.18)',
      alignSelf: 'center',
      maxWidth: '92%',
    },
    chipContent: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 14,
      paddingHorizontal: 16,
      maxWidth: '100%',
    },
    // removed liquid shine effect
    chipText: {
      color: '#E6E6F0',
      fontSize: 16,
      textAlign: 'right',
      flexShrink: 1,
    },
    listContainer: {
      flex: 1,
    },
    listContent: {
      paddingTop: 8,
    },
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    radial: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });


  const messagesWithTyping = isTyping 
    ? [...messages, { id: 'typing', text: '', sender: 'assistant' as const, timestamp: Date.now(), isTyping: true }]
    : messages;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.radial} pointerEvents="none">
        <Svg width="100%" height="100%">
          <Defs>
            <SvgRadialGradient id="bgGlow" cx="0%" cy="100%" rx="140%" ry="110%" fx="0%" fy="100%">
              <Stop offset="0%" stopColor="#b277f1" stopOpacity="0.45" />
              <Stop offset="18%" stopColor="#b277f1" stopOpacity="0.36" />
              <Stop offset="38%" stopColor="#7c3aed" stopOpacity="0.22" />
              <Stop offset="68%" stopColor="#3b1a6d" stopOpacity="0.12" />
              <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </SvgRadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#bgGlow)" />
        </Svg>
      </View>
      <ChatHeader />
      {!hasStartedChat && (
        <View style={styles.heroContainer} pointerEvents="none">
          <Text style={styles.heroTitle}>{`ברוכים הבאים\nלניארה`}</Text>
          <Text style={styles.heroSubtitle}>אני כאן כדי לתמוך בך. כדי להתחיל שיחה פשוט התחילי להקליד למטה</Text>
        </View>
      )}
      {!hasStartedChat && (
        <View style={styles.heroChips}>
          <View style={styles.chip}>
            <View style={styles.chipContent}>
              <MessageCircle size={20} color="#CBB8FF" />
              <Text style={styles.chipText}>מהירות תגובה גבוהה</Text>
            </View>
          </View>
          <View style={styles.chip}>
            <View style={styles.chipContent}>
              <BookOpen size={20} color="#CBB8FF" />
              <Text style={styles.chipText}>גישה לעדכונים ותכונות חדשות</Text>
            </View>
          </View>
          <View style={styles.chip}>
            <View style={styles.chipContent}>
              <User size={20} color="#CBB8FF" />
              <Text style={styles.chipText}>זמינות גם בשעות עומס</Text>
            </View>
          </View>
        </View>
      )}
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
      <InputBar onSend={handleSendMessage} isRTL={isRTL} disabled={isTyping} />
      <EmergencyDialog />
    </SafeAreaView>
  );
}